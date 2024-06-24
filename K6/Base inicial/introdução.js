// inicialização 
import { sleep } from "k6";

// configuração

export const options = {

vus: 1,
duration: '30s',
};


// execução // codigo vu

export default function () {
    console.log('Testando K6');
    sleep(1);
}

//desmotagem

export function teardown(data) {
   console.log(data); 
    
}