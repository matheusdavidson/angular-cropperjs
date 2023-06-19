# -- BUMP -- ##
npm run bump:major
npm run changelog
# -- /BUMP -- ##

# -- BUILD -- ##
npm run build:prod
# -- /BUILD -- ##

npm run git:tag
npm run deploy:git
npm run deploy:npm

npm run tada
git push origin --tags