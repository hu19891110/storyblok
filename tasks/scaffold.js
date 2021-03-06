var unirest = require('unirest')
var fs = require('fs')

module.exports = function(api, argv) {

  var name = argv._[1]

  if (argv.space) {
    api.setSpaceId(argv.space)
    api.post('components', {
      component: {
        name: name
      }
    }, (res) => {

      if (res.status == 200) {
        console.log(JSON.stringify(res.body, null, 2))
      } else {
        console.log(res.body)
      }

    })
  }

  var liquid = './views/components/_' + name + '.liquid'
  console.log('Writing template file to ' + liquid)
  fs.writeFileSync(liquid, require('./templates/teaser'))

  var scss = './source/scss/components/below/_' + name + '.scss'
  console.log('Writing scss file to ' + scss)
  fs.writeFileSync(scss, '// Generated by the Storyblok cli')

  console.log()
}