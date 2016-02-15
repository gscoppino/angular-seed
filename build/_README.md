Build modules go here. They should follow a general format:

```
import gulp from 'gulp';
// Other global imports
// Local imports from ./utils

export default function (config) {
    const INPUT = path.join(config.paths.src, '...');
    const OUTPUT = path.join(config.paths.dest, '...');

    // Other constants, such as plugin configs

    gulp.task('build:RESOURCENAME', function () {
        return gulp.src(INPUT)
            .pipe(...)
            .pipe(gulp.dest(OUTPUT));
    });

    gulp.task('watch:RESOURCENAME', ...);

    return {
        build: 'build:RESOURCENAME',
        watch: 'watch:RESOURCENAME'
    };
}
```

They can also do things with `config.argv` if they wish, for branched
execution.

Sample Build Module on [Github](https://gist.github.com/gscoppino/857b8fee85135625c56b).