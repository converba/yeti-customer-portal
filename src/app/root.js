define(function (require) {
  var Auth = require('../app/components/Auth');
  var Navigation = require('../app/components/Navigation');
  var Toolbar = require('../app/components/Toolbar');

  return {
    name: 'App',
    components: {
      Auth: Auth,
      Navigation: Navigation,
      Toolbar: Toolbar
    },
    data () {
      return {}
    },
    template: `
      <v-app>
        <navigation></navigation>
        <toolbar></toolbar>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
            <auth></auth>
          </v-container>
        </v-content>
        <v-footer app></v-footer>
      </v-app>
    `
  };
});
