require.config({
    baseDir: '../src',
    paths: {
        underscore: '../bower_components/underscore/underscore',
        jquery: '../bower_components/jquery/dist/jquery'
    },
    modules: [{
        name: 'transform',
        include: [
            'selector',
            'rule'
        ],
        exclude: [
            'jquery',
            'underscore'
        ]
    }]
})
