import React, { useState } from 'react';
import DonationRequestsTable from '../components/DonationRequestsTable';
import PaginationButtons from '../components/PaginationButtons';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';

const DonationRequests = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(4)
    const { data: dataCount } = useTanstackGetRequest('/donationRequests/count', 'donationRequestsCount', [], true);
    return (
        <div>
            <DonationRequestsTable limit={false}></DonationRequestsTable>
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} dataCount={dataCount}></PaginationButtons>
        </div>
    );
};

export default DonationRequests;