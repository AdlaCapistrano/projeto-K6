import http from "k6/http";


export const options = {
    scenarios: {
        listar: {
            executor:'constant-arrival-rate' ,
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preallocatedVUs: 150,
            gracefulStop: '10s',
            tags: {tast_type: 'listar_de_corocdilos'}
          
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            iterations: 20,
            vus: 50,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: {tast_type: 'encontrar_de_corocdilos'}


        }
    }
}

export function listar () {
    http.get(__ENV.URL+'crocodiles');
}

export function buscar () {
    if(__VU % 2 == 0){
        http.get(__ENV.URL+'/crocodiles/2');
    }else{
        http.get(__ENV.URL+'/crocodiles/1');
    }
}

// documentação: https://k6.io/docs/javascript-api/k6-executor