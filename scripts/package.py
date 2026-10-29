from pathlib import Path
import zipfile, shutil
root=Path(__file__).resolve().parent.parent
out=root/'dist/downloads';out.mkdir(parents=True,exist_ok=True)
shutil.copy(root/'README.md',out/'README.md')
if (root/'QA.md').exists():shutil.copy(root/'QA.md',out/'QA.md')
model_files=['model-source/courtyard-house.mjs','scripts/export-model.mjs','package.json','package-lock.json','README.md','THIRD_PARTY_LICENSES.txt','dist/assets/model-data.json']
with zipfile.ZipFile(out/'courtyard-model-source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in model_files:
  if f!='README.md':z.write(root/f,f)
 z.writestr('README.md', '# Editable Courtyard House model\n\nRun `npm ci`, then `npm run model`. The result is written to `dist/assets/courtyard-house.glb`. Edit `model-source/courtyard-house.mjs` to change the model. This ZIP contains the model generator only; get the complete project ZIP for the website and viewer.\n\nImage-based architectural concept. Visible reference annotations 30 m × 12 m conflict with image proportions; internal dimensions, 190 mm wall thickness and 2.8 m wall height are assumptions. No construction accuracy is claimed.\n')
 z.write(root/'README.md','SITE_README.md')
with zipfile.ZipFile(out/'spatially-complete.zip','w',zipfile.ZIP_DEFLATED) as z:
 for folder in ['dist','src','scripts','model-source']:
  for p in (root/folder).rglob('*'):
   if not p.is_file() or p.name.startswith('qa-') or (p.parent==out and p.suffix=='.zip'):continue
   z.write(p,p.relative_to(root))
 for f in ['README.md','QA.md','THIRD_PARTY_LICENSES.txt','glb-validation.json','package.json','package-lock.json']:
  if (root/f).exists():z.write(root/f,f)
for name in ['courtyard-model-source.zip','spatially-complete.zip']:
 with zipfile.ZipFile(out/name) as z:
  bad=z.testzip()
  if bad:raise RuntimeError('Bad ZIP: '+bad)
 print(name,(out/name).stat().st_size,'bytes')
