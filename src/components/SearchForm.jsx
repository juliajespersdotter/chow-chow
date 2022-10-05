import { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import { useState } from "react";
import useGetCollection from "../hooks/useGetCollection";

const SearchForm = ({ onSubmit, className }) => {
	const cityRef = useRef()

	const [searchInput, setSearchInput] = useState("");

    const { data: foodplaces } = useGetCollection("foodplaces");

    const filteredFoodplaces =
        searchInput === ""
            ? foodplaces
            : foodplaces.filter((foodplace) => {
                    return (
                        foodplace.city.toLowerCase().includes(searchInput.toLowerCase()) ||
                        foodplace.name.toLowerCase().includes(searchInput.toLowerCase())
                    );
              });

	const handleSearch = (e) => {
		e.preventDefault()

		if (cityRef.current.value) {
			onSubmit(cityRef.current.value)
		}
		if (!searchInput.length) {
            return;
        }

        handleSearch(searchInput);
        setSearchInput("");
	}

	return (
		<>
			<form
            onSubmit={handleSearch}
            className={`flex justify-center items-center gap-2`}
        	>

				<div className="input-group">
					<input
						type="text"
						placeholder={"Search restaurant"}
						onChange={(e) => setSearchInput(e.target.value)}
						value={searchInput}
						ref={cityRef}
					/>
				</div>

				{searchInput.length > 0 && filteredFoodplaces.length > 0 && (
					<ul className="list-search">
						{filteredFoodplaces?.map((foodplace) => (
							<li
								key={foodplace.id}
								className="list-search-item"
								onClick={() =>
									setSearchInput(`${foodplace.streetaddress}, ${foodplace.city}`)
								}
							>
								{foodplace.name}, {foodplace.city}
							</li>
						))}
					</ul>
				)}
        	</form>
			{/* <div style={{ 
				width: 400, 
				marginTop: 20,
				marginBottom: 20,
				}}>
				<ReactSearchAutocomplete className="searchbar"
					items={items}
					maxResults={4}
					fuseOptions={{ keys: ["city"] }}
					onSearch={handleOnSearch}
					onHover={handleOnHover}
					onSelect={handleOnSelect}
					onFocus={handleOnFocus}
					formatResult={formatResult}
					onSubmit={handleSubmit}
					ref={cityRef}
					styling={{ zIndex: 4 }}
					autoFocus
				/>
			</div> */}

			{/* <Form className='p-1' onSubmit={handleSearch}>
				<Form.Group controlId='city' className='mb-3'>
					<Form.Control ref={cityRef} type='text' placeholder="Search by city"/>
				</Form.Group>
			</Form>	 */}
		</>
	)
}

export default SearchForm

// import { useEffect, useState } from "react";
// import useGetCollection from "../hooks/useGetCollection";


// const SearchForm = ({ className }) => {

//     const [searchInput, setSearchInput] = useState("");

//     const { data: foodplaces } = useGetCollection("foodplaces");

//     const filteredFoodplaces =
//         searchInput === ""
//             ? foodplaces
//             : foodplaces.filter((foodplace) => {
//                     return (
//                         foodplace.city.toLowerCase().includes(searchInput.toLowerCase()) ||
//                         foodplace.name.toLowerCase().includes(searchInput.toLowerCase())
//                     );
//               });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!searchInput.length) {
//             return;
//         }

//         handleSearch(searchInput);
//         setSearchInput("");
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className={`flex justify-center items-center gap-2 ${className}`}
//         >
//             <div className="input-group">
//                 <input
//                     type="text"
//                     placeholder={"Sök..."}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     value={searchInput}
//                     className="input input-sm input-bordered w-full"
//                 />

//                 <button className="btn btn-sm btn-square">
//                     <p>search</p>
//                 </button>
//             </div>

//             {searchInput.length > 0 && filteredFoodplaces.length > 0 && (
//                 <ul className="list-search">
//                     {filteredFoodplaces?.map((foodplace) => (
//                         <li
//                             key={foodplace.id}
//                             className="cursor-pointer hover:bg-base-300 p-2"
//                             onClick={() =>
//                                 setSearchInput(`${foodplace.streetaddress}, ${foodplace.city}`)
//                             }
//                         >
//                             {foodplace.name}, {foodplace.city}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </form>
//     );
// };

// export default SearchForm;
