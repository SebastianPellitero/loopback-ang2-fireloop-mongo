
{
  "loopback-component-explorer": {
    "mountPath": "/explorer",
    "generateOperationScopedModels": true
  }
}
*/


.subscribe(() =>
            this.reference = this.rt.FireLoop.ref<Population>(Population),
            this.reference.on('change').subscribe((populations: Array<Population>) => {
              console.log(populations);
              this.populations = populations;
            })
        );