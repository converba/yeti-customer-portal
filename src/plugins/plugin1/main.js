define(function (require) {
  return {
    name: `Plugin1`,
    components: {},
    data() {
      return {
        title: 'Plugin 1',
      };
    },
    template: `
      <v-layout id="plugin1" align-center>
        <v-flex>
          <h3 class="title">{{ title }}</h3>
          <div id="plugin1-canvas"></div>
          <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Check out our newest features!</div>
          <v-btn
            class="mx-0"
            color="primary"
            large
          >
            See more
          </v-btn>
        </v-flex>
      </v-layout>
    `,
    methods: {
      render: function () {}
    },
    mounted: function() {
      let self = this
      self.render()
    }
  }
})
