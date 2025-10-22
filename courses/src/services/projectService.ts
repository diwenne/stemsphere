import { supabase } from '../lib/supabase';

type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'csharp' | 'c' | 'ruby' | 'go' | 'rust' | 'php' | 'swift' | 'kotlin' | 'r' | 'perl' | 'lua' | 'bash' | 'sql' | 'scratch';

export interface CodeProject {
  id: string;
  title: string;
  description: string;
  language: SupportedLanguage;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  title: string;
  description?: string;
  language: SupportedLanguage;
  code: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  code?: string;
}

class ProjectService {
  async createProject(data: CreateProjectData): Promise<CodeProject | null> {
    try {
      const { data: project, error } = await supabase
        .from('code_projects')
        .insert({
          title: data.title,
          description: data.description || '',
          language: data.language,
          code: data.code,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return null;
      }

      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }

  async updateProject(id: string, data: UpdateProjectData): Promise<CodeProject | null> {
    try {
      const { data: project, error } = await supabase
        .from('code_projects')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return null;
      }

      return project;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('code_projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  async getProject(id: string): Promise<CodeProject | null> {
    try {
      const { data: project, error } = await supabase
        .from('code_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return null;
      }

      return project;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  async getAllProjects(language?: SupportedLanguage): Promise<CodeProject[]> {
    try {
      let query = supabase
        .from('code_projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (language) {
        query = query.eq('language', language);
      }

      const { data: projects, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      return projects || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  saveProjectIdToSession(projectId: string): void {
    const savedProjects = this.getSavedProjectIds();
    if (!savedProjects.includes(projectId)) {
      savedProjects.push(projectId);
      sessionStorage.setItem('saved_project_ids', JSON.stringify(savedProjects));
    }
  }

  getSavedProjectIds(): string[] {
    const saved = sessionStorage.getItem('saved_project_ids');
    return saved ? JSON.parse(saved) : [];
  }

  async getMyProjects(): Promise<CodeProject[]> {
    const projectIds = this.getSavedProjectIds();
    if (projectIds.length === 0) return [];

    try {
      const { data: projects, error } = await supabase
        .from('code_projects')
        .select('*')
        .in('id', projectIds)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching my projects:', error);
        return [];
      }

      return projects || [];
    } catch (error) {
      console.error('Error fetching my projects:', error);
      return [];
    }
  }
}

export const projectService = new ProjectService();
