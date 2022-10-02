import { useState, useMemo } from 'react'
import  Offcanvas  from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import  ListGroup  from 'react-bootstrap/ListGroup'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'

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

    return (
        <>
            <Button  onClick={handleShow} className="outline-primary">
                Filter Restaurants
            </Button>

            <Offcanvas show={show} onHide={handleClose} className='offcanvas-bg'>

            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='h-text-color-dark'>Filter through restaurants</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.body>

            </Offcanvas.body>

            </Offcanvas>
        </>
    )
}

export default FilterOffcanvas