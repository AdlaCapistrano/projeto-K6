import http from 'k6/http';


import { check, group } from 'k6';

export const options = {
    vus: 4,
    duration: '5s',
   };

const id = 7;

export default function () {
    group('requisição todos os crocodilos' , function() {
        const res = http.get('http://test-api.k6.io/public/crocodiles/',{
            tags: { 
                tipo: 'todos os crocodilos'
             },

        });
       
        check(res, { 
            'status code é 200': (r) => r.status == 200
         });
    });    
    
    group('requisição por id ' , function() {
        const res2 = http.get('http://test-api.k6.io/public/crocodiles/' + id);
        check(res2, { 
             'status code é 200': (r) => r.status == 200 
        });
    });



}