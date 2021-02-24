import Header from '../../components/layout/Header'
import { useGlobalContext } from '../../context/state'

export default function Commander() {
        const [{infos}] = useGlobalContext();


        return (
                <>
                        <Header />
                        {
                           infos.map((info) => {
                                return <div key={info.product_id}>
                                          <p>{info.name}</p>      
                                          <p>{info.price*info.count}</p>      
                                </div>
                            })
                        }
                </>
        )
}