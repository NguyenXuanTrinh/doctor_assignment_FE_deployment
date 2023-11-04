import styled from "styled-components";
import { Menu, Select, Pagination, Table } from "antd";

export const CustomSelect = styled(Select)`
  &:hover {
    border-color: #4f9cfa;
    border: 1px;
  }

  .ant-select-dropdown .ant-select-item-option-content {
    padding: 10px;
  }

  border-radius: 6px;
  height: 3.75rem;
  border: 1px solid black;

  & span.ant-select-selection-placeholder {
    text-align: left;
    margin-left: 5px;
  }

  & span.ant-select-selection-item {
    text-align: left !important;
    padding-left: 0.25rem !important;
  }

  & .ant-select-arrow {
    top: 1.3rem !important;
    inset-inline-end: 16px !important;
  }
`;

export const MenuDashboard = styled(Menu)`
  & li.ant-menu-item.ant-menu-item-selected {
    background-color: #3b3a48;
    color: #8f83ae;
    font-weight: 700;
  }
  & .ant-menu-submenu-title {
    color: white !important;
  }
  & .ant-menu-item-active {
    color: #8f83ae !important;
    background-color: #4a4658 !important;
  }
`;

export const CustomButton = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid;
`;

export const CustomTable = styled(Table)`
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;

  & .ant-table-container {
    border-radius: 0px !important;
  }
  & .ant-table-header {
    border-radius: 0px !important;
  }
  & td.ant-table-cell {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    border-bottom: 1px solid #d9d9d9 !important;
  }

  & th.ant-table-cell {
    background-color: #ebeefb !important;
    padding: 15px !important;
    color: #646368 !important;
    font-weight: 500 !important;
    border-bottom: 1px solid #d9d9d9 !important;
    height: 21px !important;
    max-height: 21px !important;
  }
  & td.ant-table-cell-row-hover {
    background-color: #fff4e8 !important;
    cursor: pointer;
  }

  & th.ant-table-cell:first-child {
    border-start-start-radius: 0px !important;
  }

  & th.ant-table-cell:last-child {
    border-start-end-radius: 0px !important;
  }

  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none !important;
  }
`;

export const CustomPagination = styled(Pagination)`
  background: white;
  font-size: 13px !important;
  padding: 8px 16px 8px 16px;
  border-radius: 0px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: end;

  & li.ant-pagination-item {
    display: none;
  }

  & li.ant-pagination-prev {
    min-width: 20px;
    margin: 0px;
  }
  & li.ant-pagination-next {
    min-width: 20px;
    margin: 0px;
  }
  & button.ant-pagination-item-link {
    border: 0px !important;
  }

  & li.ant-pagination-jump-prev.ant-pagination-jump-prev-custom-icon {
    display: none;
  }
  & li.ant-pagination-jump-next.ant-pagination-jump-next-custom-icon {
    display: none;
  }
  & li.ant-pagination-options .ant-select-selector {
    border-radius: 0 !important;
    font-size: 13px !important;
  }
`;
