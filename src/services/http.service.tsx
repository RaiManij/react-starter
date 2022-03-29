import Connection from "../types/Connection";
import ConnectionTypes, { ConnectionMap } from "../types/ConnectionTypes";
export default class HttpService{
    connectionUrl:string;
    constructor(connectionUrl:string){
        this.connectionUrl = connectionUrl;
    }

    getRequest(method:string,accessToken:string){
        return fetch(this.connectionUrl + method,{
                    headers:{
                        Authorization: 'Bearer ' + accessToken
                    }
                });
    }

    getClientConnections(url:string,callback:Function){
        var Auth0 = {
            setClient:function(homeRealm:ConnectionTypes){ 
                let connections:Connection[] = [];
                let strategies:ConnectionMap[] = homeRealm.strategies;
                for(var i in strategies){
                    connections = connections.concat(strategies[i].connections);
                }
                callback(connections);
             }
        };
        return fetch(url).then(r => r.text()).then((script:string)=>{
            console.log(script);
            eval(script);
        }).catch(function(error){
        const {message} = error;
        console.log(message);
        });
    }
    
}