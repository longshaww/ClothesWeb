import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import './index.css';
import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
const TableBoostrap = (props) => {
    const { SearchBar } = Search;
    const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
        <li key={text} role="presentation" className="dropdown-item">
            <a
                href="#"
                tabIndex="-1"
                role="menuitem"
                data-page={page}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onSizePerPageChange(page);
                }}
                style={{ color: 'red' }}
            >
                {text}
            </a>
        </li>
    );

    const options = {
        sizePerPageOptionRenderer,
    };
    return (
        <ToolkitProvider keyField="id" data={props.data} columns={props.myCols} search>
            {(propss) => (
                <div>
                    {/* <h3>Tìm kiếm đơn hàng</h3> */}
                    <SearchBar
                        place
                        style={{ with: '500px' }}
                        {...propss.searchProps}
                        placeholder={'Tìm kiếm đơn hàng'}
                    />
                    <hr />
                    <BootstrapTable
                        {...propss.baseProps}
                        filter={filterFactory()}
                        rowStyle={{ textAlign: 'center' }}
                        pagination={paginationFactory(options)}
                    />
                </div>
            )}
        </ToolkitProvider>
    );
};

export default TableBoostrap;
