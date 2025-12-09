import os
import shutil

source_dir = '/Users/diwenhuang/websites/stemsphere/landing/public/media'
dest_dir = '/Users/diwenhuang/websites/stemsphere/landing/public/images/gallery'

files = [f for f in os.listdir(source_dir) if f.startswith('DSCF') and f.endswith('.JPG')]
files.sort()

start_index = 21

for i, filename in enumerate(files):
    new_name = f'gallery-{start_index + i}.jpg'
    source_path = os.path.join(source_dir, filename)
    dest_path = os.path.join(dest_dir, new_name)
    
    print(f'Moving {source_path} to {dest_path}')
    shutil.move(source_path, dest_path)
