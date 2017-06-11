var nt = [];
var nc = 1;
var priorityClasses = {
    3 : 'high',
    2 : 'medium',
    1 : 'low',
};
window.addEventListener("load",function () {
    var storednt = localStorage.getItem("nt");
    if(storednt) {
        nt = JSON.parse(storednt);
        nc = Number(localStorage.getItem('nc'));
        for(var i = 0; i < nt.length; ++i) {
            neAdd(nt[i]);
        }
    }
});
 var nn = {}
    nn.id       = nc;
    nn.title    = document.querySelector('.title').value;
    nn.content  = document.querySelector('.content').value;
nn.priority = Number(document.querySelector('.priority').value);
 nc++;
    nt.push(nn);
    neAdd(nn);
    nttore();
}
function neAdd(ne) {
   
    var nnContainer   = document.createElement('div');
    var nnBody        = document.createElement('div');
    var nnTitle       = document.createElement('h2');
   
    nnTitle.iht = ne.title;
    nnBody.iht  = ne.content;
    
    nnContainer.className = "ne";
    nnTitle.className     = "ne-title";
    nnBody.className      = "ne-body";
    
    nnContainer.id = "ne-"+ne.id;
    nnContainer.appendChild(nnTitle);
    nnContainer.appendChild(nnBody);
    nnContainer.className += " " + priorityClasses[ne.priority];
    nnContainer.iht += '<button title="Edit" class="ne-button ne-edit" onclick="neEditStart(event)">📝</button>';
    nnContainer.iht += '<button title="Close" class="ne-button ne-close" onclick="neDelete(event)">✘</button>';
    document.querySelector('#nt-container').appendChild(nnContainer);
}
function neDelete(event) {
   
    var elementToDelete = event.target.parentNode;
    elementToDelete.remove();
   
    var eci = Number(elementToDelete.id.split('-')[1]);
    for (var i = nt.length - 1; i >= 0; --i) {
        if(nt[i].id === eci) {
            nt.splice(i, 1);
            break;
        }
    }
    nttore();
}

function neEditStart(event) {
   
    var eee = event.target.parentNode;
    var eci = Number(eee.id.split('-')[1]);
    var cn = {};
    
    for (var i = nt.length - 1; i >= 0; --i) {
        if(nt[i].id === eci) {
            cn = nt[i];
            break;
        }
    }
   
    eee.iht = "";
    
    eee.iht += '<input class="title" value="'+cn.title+'"></input>';
    eee.iht += '<textarea class="content">'+cn.content+'</textarea>';
    eee.iht += '<select name="priority" class="priority">' +
                               '<option value="3">High</option>' +
                               '<option value="2">Medium</option>' +
                               '<option value="1">Low</option>' +
                               '</select>';
    eee.iht += '<button onclick="neEditFinish(event)">Finish Edit</button>';
    
    eee.getElementsByTagName('select')[0].value = cn.priority;
}

function neEditFinish(event) {
   
    var eee = event.target.parentNode;
    var eci = Number(eee.id.split('-')[1]);

    var newTitle    = eee.querySelectorAll('input')[0].value;
    var newContent  = eee.querySelectorAll('textarea')[0].value;
    var newPriority = eee.querySelectorAll('select')[0].value;

    var nnBody        = document.createElement('div');
    var nnTitle       = document.createElement('h2');

    nnTitle.iht = newTitle;
    nnBody.iht  = newContent;

    nnTitle.className     = "ne-title";
    nnBody.className      = "ne-body";

    for (var i = nt.length - 1; i >= 0; --i) {
        if(nt[i].id === eci) {
            nt[i].title = newTitle;
            nt[i].content = newContent;
            break;
        }
    }

    eee.iht = "";

    eee.appendChild(nnTitle);
    eee.appendChild(nnBody);

    eee.iht += '<button title="Edit" class="ne-button ne-close" onclick="neDelete(event)">✘</button>';
    eee.iht += '<button title="Close" class="ne-button ne-edit" onclick="neEditStart(event)">📝</button>';

    eee.className = "ne " + priorityClasses[newPriority];

    nttore();
}
function ntort() {
    var compare = function(a,b) {
        if (a.priority < b.priority)
            return 1;
        if (a.priority > b.priority)
            return -1;
        return 0;
    }
    nt = nt.sort(compare);
    document.querySelector('#nt-container').iht = "";
    for(var i = 0; i < nt.length; ++i) {
        neAdd(nt[i]);
    }
    nttore();
}
function nttore() {
    localStorage.setItem('nt',JSON.stringify(nt));
    localStorage.setItem('nc',String(nc));
}
