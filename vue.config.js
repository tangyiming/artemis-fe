module.exports = {
    configureWebpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'html-loader'
                },
                {
                    loader: 'markdown-loader',
                    options: {}
                }
            ]
        })
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'searchform-bgcolor': '#fbfbfb',
                    'icon-color': '#FFF'
                },
                javascriptEnabled: true
            }
        }
    }
}
