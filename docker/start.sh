#!/bin/sh

cd /var/www

sed -i -e '
/CLIENT_BASE_URL/c CLIENT_BASE_URL='${API_URL}'
/GIT_CLIENT_ID/c GIT_CLIENT_ID='${GIT_CLIENT_ID}'
/WEICHAT_APP_ID/c WEICHAT_APP_ID='${WEICHAT_APP_ID}'
/description/c description='${DESCRIPTION}'
/title/c title='${TITLE}'
/BEIAN/c BEIAN='${BEIAN}'
/ANALYTICS/c ANALYTICS='${ANALYTICS}'
/lang/c lang='${LANG}'
/MASTER_EMAIL/c MASTER_EMAIL='${MASTER_EMAIL}'
/DOMAIN/c DOMAIN='${DOMAIN}'' .env

npm run start
exec /bin/sh