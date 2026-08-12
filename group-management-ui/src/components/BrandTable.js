import { Link } from "react-router-dom";

function BrandTable({ brands, onDelete }) {

    return (
        <tbody>

            {brands.length > 0 ? (

                brands.map((brand, index) => (

                    <tr key={brand.brandId}>

                        {/* Sr.No */}
                        <td>
                            {index + 1}
                        </td>

                        {/* Group */}
                        <td>
                            {brand.chain && brand.chain.group
                                ? brand.chain.group.groupName
                                : "-"}
                        </td>

                        {/* Company */}
                        <td>
                            {brand.chain
                                ? brand.chain.companyName
                                : "-"}
                        </td>

                        {/* Brand */}
                        <td>
                            {brand.brandName}
                        </td>

                        {/* Edit */}
                        <td>
                            <Link
                                to={`/edit-brand/${brand.brandId}`}
                                className="btn btn-primary btn-sm"
                            >
                                Edit
                            </Link>
                        </td>

                        {/* Delete */}
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    onDelete(brand.brandId)
                                }
                            >
                                Delete
                            </button>
                        </td>

                    </tr>

                ))

            ) : (

                <tr>

                    <td
                        colSpan="6"
                        className="text-center"
                    >
                        No Brands Found
                    </td>

                </tr>

            )}

        </tbody>
    );
}

export default BrandTable;