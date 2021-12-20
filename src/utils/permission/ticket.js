export class Ticket {
    constructor(perms, organization, project){
        this.perms = perms;
        this.organization = organization;
        this.project = project
    }

    has(perm_list){
        for(let perm of perm_list){
            if(this.perms.includes(perm)){
                return true;
            }
        }
        return false;
    }
}