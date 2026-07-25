export const calcularNotaFinal = (

    corte1,

    corte2,

    corte3

) => {

    const c1 = Number(corte1) || 0;

    const c2 = Number(corte2) || 0;

    const c3 = Number(corte3) || 0;

    return (

        (

            c1 +

            c2 +

            c3

        ) / 3

    ).toFixed(2);

};