cd ../
cp -rf ./README.md ./docs
cp -rf ./CHANGELOG.md ./docs
git add -A
git commit --amend --no-edit
git push origin master
git push origin --tags --force
cd scripts