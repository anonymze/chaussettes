import { useGlobalContext } from '../../context/state';
import Header from '../../components/layout/Header';
import Card from '../../components/Card';

export default function Panier() {
    const [{ infos }] = useGlobalContext();

    return (
        <>
            <Header />
            <h2>Récap du panier</h2>
            {
                infos.map((info) => {
                    return <Card key={info.product_id} product={info} />
                })
            }
        </>
    )
}