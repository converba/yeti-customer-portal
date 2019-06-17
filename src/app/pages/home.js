define(function (require) {
  return {
    name: `Home`,
    components: {},
    data() {
      return {
        title: 'Title',
      };
    },
    template: `
      <div>
        <div class="row">
          <div class="col">
            <h1 class="h4">{{ title }}</h1>
          </div>
        </div>
      </div>
    `,
  };
});
