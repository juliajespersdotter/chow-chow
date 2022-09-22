import React, { useState } from 'react'
import { collection, query, orderBy } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import Fooddata from './data'
import Card from 'react-bootstrap/Card'

const FilterForm = () => {

    const [menu, setMenu] = useState(Fooddata);

	const foodplaceRef = collection(db, 'foodplaces')
    const queryRef = query(foodplaceRef, orderBy('name'))
	const { data: foodplaces } = useFirestoreQueryData(
		['foodplaces'],
		queryRef,
		{
			idField: 'id',
			subscribe: true,
		}
	)

    const filteritems = (curitems) => {
        const updateitems = foodplaces.filter((cur) => {
            return cur.category === curitems;
        })
        setMenu(updateitems);
    };

    return (
        <>
            <section className='mt-2'>
                <h2 className='text-center mb-2' style={{ fontWeight: 400 }}>Search Your Food</h2>

                <div className="btn-container d-flex justify-content-around mt-2">
                    <button className="btn btn-primary" onClick={() => filteritems("chinese")}>Chinese</button>
                    <button className="btn btn-primary" onClick={() => filteritems("japanese")}>Japanese</button>
                    <button className="btn btn-primary" onClick={() => filteritems("pizza")}>Pizza</button>
                    <button className="btn btn-primary" onClick={() => filteritems("coffee")}>Coffee</button>
                    <button className="btn btn-primary" onClick={() => setMenu(Fooddata)}>All</button>
                </div>

                <div className='container mt-3'>
                    <div className="row d-flex justify-content-center align-items-center">
                        {menu.map((e) => {
                            return (
                                <>
                                    <Card key={e.id} style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style" >
                                        <Card.Img variant="top" src={e.imgdata} style={{ height: "16rem" }} className='mt-3' />
                                        <Card.Body>
                                            <Card.Title>{e.name}</Card.Title>
                                            {/* <Card.Text>
                                                Price :  {e.price}
                                            </Card.Text> */}
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FilterForm