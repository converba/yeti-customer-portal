define(function (require) {
  return {
    name: `Home`,
    components: {},
    template: `
      <div>
        <div class="row">
          <div class="col">
            <h1 class="h4">{{ $t('core.title') }}</h1>
          </div>
        </div>
      </div>
    `,
  };
});
