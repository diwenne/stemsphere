# Complete Guide: Setting up learn.stemsf.org

This guide will walk you through deploying the courses site to `learn.stemsf.org`.

## Prerequisites
- GitHub account with the monorepo pushed
- Vercel account
- Access to your domain registrar (where you bought stemsf.org)

---

## Step 1: Create Vercel Project for Courses

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**
   - Select your GitHub account
   - Find and select the `stemsphere` repository
   - Click "Import"

4. **Configure the project settings:**

   **Project Name:** `stemsf-courses` (or any name you prefer)

   **Framework Preset:** Select `Vite`

   **Root Directory:** Click "Edit" next to "Root Directory"
   - Type: `courses`
   - Click "Continue"

   **Build & Development Settings:**
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `dist` (should auto-detect)
   - Install Command: `npm install` (should auto-detect)

5. **⚠️ STOP - Don't click Deploy yet!**

---

## Step 2: Add Environment Variables

**BEFORE deploying**, scroll down to the **Environment Variables** section:

### Add Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://vhgcoscdaycvkjopsrjb.supabase.co`
- **Environments:** Check all three boxes:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

### Add Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZ2Nvc2NkYXljdmtqb3BzcmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNTY4NzksImV4cCI6MjA3NTczMjg3OX0.ca8PZOfJXKob2vQhF68Izz23wkw1QQu7-H36aJkAgMk`
- **Environments:** Check all three boxes:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

6. **Now click "Deploy"**

7. **Wait for deployment to complete** (usually 1-2 minutes)

8. **Your site will be live at:** `stemsf-courses.vercel.app` (or similar)

---

## Step 3: Add Custom Domain

1. **In your Vercel project**, click on **"Settings"** in the top menu

2. **Click "Domains"** in the left sidebar

3. **Add your subdomain:**
   - Click the "Add" button
   - Enter: `learn.stemsf.org`
   - Click "Add"

4. **Vercel will show you DNS instructions**
   - You'll see a message asking you to add a CNAME record
   - Keep this page open - you'll need the information

---

## Step 4: Configure DNS at Your Domain Registrar

Now you need to add DNS records where you manage `stemsf.org`. Common registrars include:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- AWS Route 53

### Steps (general - varies by registrar):

1. **Log into your domain registrar**

2. **Find DNS Management / DNS Settings**
   - Usually under "Domain Management" or "DNS"
   - Look for "Manage DNS" or "Advanced DNS"

3. **Add a new CNAME record:**

   | Type  | Host/Name | Value/Target           | TTL        |
   |-------|-----------|------------------------|------------|
   | CNAME | `learn`   | `cname.vercel-dns.com` | Automatic  |

   **Example for different registrars:**

   **Namecheap:**
   - Type: CNAME Record
   - Host: `learn`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic

   **GoDaddy:**
   - Type: CNAME
   - Name: `learn`
   - Value: `cname.vercel-dns.com`
   - TTL: 600 (or default)

   **Cloudflare:**
   - Type: CNAME
   - Name: `learn`
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only (gray cloud) - **Important!**

4. **Save the DNS record**

---

## Step 5: Wait for DNS Propagation

1. **DNS changes can take:**
   - Minimum: 5-10 minutes
   - Maximum: 48 hours
   - Usually: 15-30 minutes

2. **Check DNS propagation:**
   - Go to [https://dnschecker.org/](https://dnschecker.org/)
   - Enter: `learn.stemsf.org`
   - Select "CNAME" from the dropdown
   - Click "Search"
   - Wait until you see `cname.vercel-dns.com` showing up globally

3. **Go back to Vercel:**
   - Refresh the Domains page
   - Once DNS propagates, Vercel will show "Valid Configuration ✓"
   - SSL certificate will be automatically provisioned

---

## Step 6: Verify It's Working

1. **Open your browser**

2. **Go to:** `https://learn.stemsf.org`

3. **You should see:**
   - Your courses website
   - Grid background pattern
   - Content Library with language cards
   - Secure HTTPS connection (padlock icon)

---

## Troubleshooting

### Issue: "Domain not found" or 404 error
**Solution:**
- Check that the CNAME record is correct: `learn` → `cname.vercel-dns.com`
- Wait longer for DNS propagation
- Clear your browser cache

### Issue: "Invalid Configuration" in Vercel
**Solution:**
- Make sure you added the CNAME record, not an A record
- If using Cloudflare, set proxy to "DNS only" (gray cloud)
- Check for typos in the DNS record

### Issue: SSL certificate error
**Solution:**
- Wait a few more minutes - SSL provisioning can take time
- Vercel will automatically generate a Let's Encrypt certificate
- Check back in 5-10 minutes

### Issue: Site shows but environment variables missing
**Solution:**
- Go to Vercel → Settings → Environment Variables
- Make sure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are added
- Redeploy: Go to Deployments → Click "..." on latest → Redeploy

### Issue: Changes not showing
**Solution:**
- Push new code to GitHub
- Vercel will automatically redeploy
- Or manually redeploy: Deployments → "..." → Redeploy

---

## Maintenance & Updates

### Deploying Updates
1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Vercel automatically detects the push and redeploys
4. Changes live in ~1-2 minutes

### Viewing Deployment Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click on any deployment to see logs

### Adding More Environment Variables
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add new variable
4. Redeploy for changes to take effect

---

## Summary Checklist

- ✅ Created Vercel project with root directory set to `courses`
- ✅ Added environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
- ✅ Deployed successfully to Vercel
- ✅ Added custom domain `learn.stemsf.org` in Vercel
- ✅ Added CNAME record at domain registrar
- ✅ Waited for DNS propagation
- ✅ Verified SSL certificate is active
- ✅ Site accessible at https://learn.stemsf.org

---

## Next Steps

Once `learn.stemsf.org` is live, you can:
1. Deploy the landing page to `stemsf.org` (same process, but use `landing` as root directory)
2. Set up automatic deployments for branches (Vercel does this by default)
3. Add custom deployment notifications
4. Monitor analytics in Vercel dashboard

**Need help?** Check Vercel docs: https://vercel.com/docs
