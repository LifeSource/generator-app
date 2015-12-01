var gulp = require("gulp"),
    del = require("del"),
    path = require("path"),
    args = require("yargs").argv,
    babelify = require("babelify"),
    browserify = require("browserify"),
    browserSync = require("browser-sync"),
    source = require("vinyl-source-stream"),
    $ = require("gulp-load-plugins")({lazy: true});

var config = require("./config")();

gulp.task("default", ["help"]);
gulp.task("help", $.taskListing);

// Utilities Functions

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    log("*** Starting browser sync");
    if (browserSync.active || args.nosync) {
    	return;
    }

    if (isDev) {
    	gulp.watch([config.styles, config.js], ["styles", "inject", browserSync.reload])
    		.on("change", function (event) { changeEvent(event); });
    } else {
    	gulp.watch([config.styles, config.js, config.html], ["optimize", browserSync.reload])
    		.on("change", function (event) { changeEvent(event); });
    }

    var options = {
    	proxy: "localhost:" + config.port,
    	port: 8000,
    	files: isDev ? [
    		config.client + "**/*.*",
    		"!" + config.styles,
    		config.css + "**/*.css"
    	] : [],
    	ghostMode: {
    		clicks: true,
    		scroll: true,
    		location: false,
    		form: true
    	},
    	injectChanges: true,
    	logFileChanges: true,
    	logLevel: "debug",
    	logPrefix: "gulp-bs",
    	notify: true,
    	reloadDelay: 1,
    };

    browserSync(options);
}


function clean(path, done) {
    del(path).then(function () {
    	log("Cleaning: " + $.util.colors.blue(path));
    	done();
    });
}

function log(msg) {
    if (typeof msg === "object") {
    	for (var item in msg) {
    		if (item.hasOwnProperty(item)) {
    			$.util.log($.util.colors.blue(msg[item]));
    		}
    	}
    } else {
    	$.util.log($.util.colors.blue(msg));
    }
}
