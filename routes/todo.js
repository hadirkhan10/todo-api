var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Appleis1',
    database: 'todo_list'
});
mc.connect();

router.get('/tasks', function(req, res, next) {
    mc.query('SELECT * FROM todo', function(error, results, fields) {
        if (error) {
            throw error;
        }
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(results));
    })
})

router.post('/tasks', function(req, res, next) {
    if (!req.body.title) {
        res.set('Content-Type', 'application/json');
        return res.send(JSON.stringify({response: 'error', message: 'No title present in the request'}))
    }
    if (!req.body.description) {
        res.set('Content-Type', 'application/json');
        return res.send(JSON.stringify({response: 'error', message: 'No description present in the request'}))
    }
    mc.query("INSERT INTO todo SET ?", {title: req.body.title, description: req.body.description}, function(error, results) {
        if (error) {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({response: 'error'}))
        }
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'success', 'message': 'Data inserted'}))
    })
})

router.get('/tasks/:taskId', function(req, res, next) {
    if (!req.params.taskId) {
        res.set('Content-Type', 'application/json')
        return res.send(JSON.stringify({repsonse: 'error', message: 'No id parameter given'}))
    }
    mc.query('SELECT * FROM todo WHERE id=?', [req.params.taskId], function(error, results) {
        if (error) {
            res.set('Content-Type', 'application/json');
            return res.send(JSON.stringify({response: 'error', message: error}))
        }
        res.set('Content-Type', 'application/json');
        return res.send(JSON.stringify(results));
    })
})

router.put('/tasks/:taskId', function(req, res, next) {
    if (!req.params.taskId) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'error', message: 'No id parameter given'}))
    }
    if (!req.body.title) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'error', message: 'No title parameter given'}))
    }
    if (!req.body.description) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'error', message: 'No description parameter given'}))
    }
    mc.query('UPDATE todo SET title=?, description=? WHERE id=?',[req.body.title, req.body.description, req.params.taskId], function(error, results) {
        if (error) {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({response: 'error', message: error}))       
        }
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'success', message: 'Data updated successfully'}))
    })
})

router.delete('/tasks/:taskId', function(req, res, next) {
    if (!req.params.taskId) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'error', message: 'No id parameter given'}))
    }
    mc.query('DELETE FROM todo WHERE id=?', [req.params.taskId], function(error, results) {
        if (error) {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({response: 'error', message: error}))
        }
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({response: 'success', message: 'Todo deleted successfully'}))
    })
})

module.exports = router;