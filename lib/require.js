(function(global) {
    'use strict';
    
    /* global cat */
    /* global pwd */
    
    var Modules = {};
    
    global.require = function(name) {
        var fn, data, dirname, filename,
            module = {
                exports: {}
            };
        
        if (!name)
            throw(Error('missing path'));
        
        if (Modules[name]) {
            module.exports = Modules[name];
        } else {
            dirname     = getDirname(name);
            filename    = getFileName(name);
            data        = tryFile(name);
            fn          = Function([
                'exports',
                'require',
                'module',
                '__filename',
                '__dirname'
            ], data);
            
            fn(module.exports, require, module, filename, dirname);
            Modules[name] = module.exports;
        }
        
        return module.exports;
    };
    
    function getDirname(path) {
        var name, index; 
        
        if (!~path.indexOf('../'))
            path = path.replace('./', '');
        
        if (~path.indexOf('/'))
            path = [pwd(), path].join('/');
        
        index   = path.lastIndexOf('/'),
        name    = path.substr(path, index);
        
        return name;
    }
    
    function getFileName(path) {
        var index   = path.lastIndexOf('/'),
            dir     = path.substr(path, index + 1),
            name    = path.replace(dir, '');
        
        return name;
    }
    
    function tryFile(name) {
        var is, data; 
        
        is = ['.js', '.json'].some(function(ext) {
            var error = tryCatch(function() {
                data = cat(name + ext);
            });
            
            return !error;
        });
        
        if (!is)
            throw(Error('Cannot find module \'' + name + '\''));
        
        return data;
    }
    
    function tryCatch(fn) {
        var error;
        
        try {
            fn();
        } catch(e) {
            error = e;
        }
        
        return error;
    }
    
})(this);
