define(function (require) {
  return {
    name: `Plugin2`,
    components: {},
    data() {
      return {
        title: 'Plugin 2',
      };
    },
    template: `
      <div id="plugin2" class="row">
        <div class="col">
          <h1 class="h4">{{ $t('plugin2.title') }}</h1>
        </div>
      </div>
    `,
    methods: {
      render: function () {
        console.log('Render Plugin2')
      }
    },
    mounted: function() {
      console.log('mounted');
      let self = this;
      window.addEventListener('load', () => {
        self.render()
      })
    }
  }
})
