export default class LocalStorageManager{
    static getItem(itemName){
        return JSON.parse(localStorage.getItem(itemName)) || [];
    }

    static setItem(itemName, itemValues){
        var encodedValues = JSON.stringify(itemValues);
        localStorage.setItem(itemName, encodedValues);
    }

    static updateUsers(user){
        var allItems = this.getItem('users') || [];

        allItems.push(user);
        this.setItem('users', allItems);
    }

    static updateRepos(userId, repos){
        var allItems = this.getItem('repos') || [];

        allItems.push({
            login: userId,
            repos : repos
        });
        this.setItem('repos', allItems);
    }

    static updateFollowers(userId, followers){
        var allItems = this.getItem('followers') || [];

        allItems.push({
            login: userId,
            followers : followers
        });
        this.setItem('followers', allItems);
    }

    static checkUserExists(userId){
        var filteredUser = this.getUserByLoginId(userId);
        return filteredUser?true:false;
    }

    static getReposByLoginId(userId){
        var allItems = this.getItem('repos') || [];

        var filtered = allItems.filter(function(user){
            if(user.login.toLowerCase() === userId.toLowerCase()) return user;
        });

        return filtered[0] && filtered[0].repos || [];
    }

    static getFollowersByLoginId(userId){
        var allItems = this.getItem('followers') || [];

        var filtered = allItems.filter(function(user){
            if(user.login.toLowerCase() === userId.toLowerCase()) return user;
        });

        return filtered[0] && filtered[0].followers || [];
    }

    
    static getUserByLoginId(userId){
        var allItems = this.getItem('users') || [];

        var filtered = allItems.filter(function(user){
            if(user.login.toLowerCase() === userId.toLowerCase()) return user;
        });

        return filtered && filtered[0];
    }

    static clearAllItems(){
        localStorage.clear();
    }
}