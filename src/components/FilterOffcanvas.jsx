import { useState, useMemo } from 'react'
import  Offcanvas  from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import  ListGroup  from 'react-bootstrap/ListGroup'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import FoodPlaceItem from './FoodPlaceItem'
import SearchForm from '../components/SearchForm'


const FilterOffcanvas = ({}) => {

    const [cityWhere, setcityWhere] = useState(null)
    const [nameOrder, setNameOrder] = useState('asc')
    const [mealsWhere, setMealsWhere] = useState('All')
    const [typeWhere, setTypeWhere] = useState('All')

    const [queryLimits, setQueryLimits] = useState({
        cityWhere,
        nameOrder,
        mealsWhere,
        typeWhere,
    })

    const [show, setShow] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleFoodFilter = (city) => {
        setQueryLimits({
            cityWhere: city,
            nameOrder,
            mealsWhere,
            typeWhere,
        })
    }

    const columns = useMemo( () => {

        return [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Meals',
                accessor: 'meals'
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Cuisine',
                accessor: 'cuisine'
            }
        ]

    }, [] )

    const { data, loading } = useGetQueryFoodplaces(queryLimits)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleSubmit = async (city) => {
		if (city) {
			try {
				await getLatLng(city)
			} catch (err) {
				setErrorMsg(err.message)
				console.log(errorMsg)
			}
		}
	}

    return (
        <>
            <Button  onClick={handleShow} className="outline-primary">
                Filter Restaurants
            </Button>

            <Offcanvas show={show} onHide={handleClose} className='offcanvas'>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='h-text'>Filter through restaurants</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {loading && (
                        <p>Loading ....</p>
                    )}
                        {
                            data && (
                                <>

                                    <p>By type</p>
                                    <select className="form-select mb-3" onChange={(e)=>{setTypeWhere(e.target.value)}} defaultValue={typeWhere}>
                                        <option value="All">All types</option>
                                        <option value="Kiosk/Grill">Kiosk/Grill</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Fast food">Fast food</option>
                                    </select>

                                    <p>By Meal</p>
                                    <select className="form-select mb-3" onChange={(e)=>{setMealsWhere(e.target.value)}} defaultValue={mealsWhere}>
                                        <option value="All">All Meals</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="After Work">After Work</option>
                                    </select>

                                    <p>Sort name: </p>
                                    <select className="form-select mb-3" onChange={(e)=>{setNameOrder(e.target.value)}} defaultValue={nameOrder}>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>


                                    <Button onClick={() =>{handleFoodFilter(cityWhere)}} className='btn-color my-3'>Filter</Button>

                                </>
                            )
                        }

                    <SearchForm onSubmit={handleSubmit} />

                </Offcanvas.Body>

            </Offcanvas>
        </>
    )
}

export default FilterOffcanvas