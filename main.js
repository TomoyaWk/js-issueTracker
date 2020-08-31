document.getElementById('issue-input-form').addEventListener('submit', saveIssue);

/*
 *issueの初期ステータスを設定 
 * @param e event submitボタン押下時
 * 
 */
function saveIssue(e) {
    let issueDesc = document.getElementById('issue-desc-input').value;
    let issuePriority = document.getElementById('issue-priority-input').value;
    let issueAssignedTo = document.getElementById('issue-assignedTo-input').value;
    let issueId  = chance.guid(); //uniqueIDを生成
    let issueStatus = 'Open'; //初期進捗ステータス

    //新規issue各項目セット
    let issue = {
        id : issueId,
        description : issueDesc,
        priority : issuePriority,
        assignedTo : issueAssignedTo,
        status : issueStatus
    }
    
    //既存issuesなしの場合
    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        //既存issuesありの場合
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    //html側のform内容をリセット
    document.getElementById('issue-input-form').reset();
    //表示更新
    fetchIssues();
}

/*
*issueのステータス変更
*/
function setStatusClosed(id) {

    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].status = 'Closed'
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
/*
 *issueの削除処理 
 * 
 */ 
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

/*
 *すでに投稿済みのissueを取得、表示する 
 * 
 */
function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issues-list');

    issuesList.innerHTML = '';
    
    if (issues !== null){    
        for (let i = 0; i < issues.length; i++) {
            let id = issues[i].id;
            let desc = issues[i].description;
            let priority = issues[i].priority;
            let assignedTo = issues[i].assignedTo;
            let status = issues[i].status;

            issuesList.innerHTML += '<div class="card bg-light my-3">'+
                                    '<h6 class="card-header">Issue ID:' + id +'</h6>'+
                                    '<div class="card-body">' +
                                    '<div class="card-text">' +
                                    '<p><span class="badge badge-info">' + status + '</span></p>' + 
                                    '<h3>' + desc + '</h3>' + 
                                    '<p><i class="fas fa-exclamation-circle fa-sm mr-1"></i>' + priority + '</p>' + 
                                    '<p><i class="fas fa-user fa-sm mr-1"></i>' + assignedTo  + '</p>' +
                                    '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mr-1">Close</a>' + 
                                    '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                    '</div>'
                                    '</div>' +
                                    '</div>';
        }
    }
}


