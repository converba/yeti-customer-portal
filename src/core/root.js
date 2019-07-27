define(function (require) {
  var Auth = require('../core/components/Auth');
  var Navigation = require('../core/components/Navigation');
  var Toolbar = require('../core/components/Toolbar');

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
