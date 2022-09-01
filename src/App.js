import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLead, deleteLead, getLead, getLeadList, updateLead } from "./api";
import "./App.css";
import ItemForm from "./components/ItemForm";
import ItemFilter from "./components/ItemFilter";
import ItemList from "./components/ItemList";
import { setItem, setItems, updateItems } from "./redux/actions/itemsAction";
import moment from "moment";

const App = () => {
  const initialState = {
    dateTime: "",
    education: "",
    experience: "",
    hobby: "",
    lessonTitle: "",
    location: "",
    picture: "",
    rate: "",
    type: ""
  };
  const initialFilterState = { education: "", fromDate: "", minRate: "0", maxRate: "500", title: "", toDate: "" };
  const [offset, setOffset] = useState(0);
  const [lead, setLead] = useState(initialState);
  const [filters, setFilters] = useState(initialFilterState);
  const dispatch = useDispatch();
  const leadList = useSelector(state => state.allItems.items);
  const onHandleSubmit = async item => {
    let formData = { ...item, dateTime: moment(item?.dateTime).format("DD/MM/YYYY HH:mm:ss") };
    let blankInput = Object.values(formData).filter(item => item === "").length > 0 ? true : false;
    if (blankInput) {
      alert("Click + button to add Experience");
      return 0;
    }
    let payload = new FormData();
    Object.entries(formData).forEach(item => payload.append(item?.[0], item?.[1]));
    try {
      let res = !formData?.id ? await addNewLead(payload) : await updateLead(formData?.id, payload);
      const { status, message, data } = res;
      if (status) {
        dispatch(setItem(initialState));
        handleGetLeadList(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetLeadList = async (offset, filter) => {
    console.log(filter);
    try {
      const res = await getLeadList(offset, filter?.title, filter?.education, filter?.fromDate, filter?.toDate, filter?.minRate, filter?.maxRate);
      const { status, message, data } = res;
      if (status) dispatch(setItems(data));
    } catch (error) {}
  };
  const handleUpdateLeadList = async offset => {
    try {
      const res = await getLeadList(offset);
      const { status, message, data } = res;
      if (status) dispatch(updateItems(data));
    } catch (error) {}
  };
  useEffect(() => {
    handleGetLeadList(0);
    console.log("here");
  }, []);
  useEffect(() => {
    offset > 0 && handleUpdateLeadList(offset);
  }, [offset]);
  const loadNext = () => {
    setOffset(offset + 1);
  };
  const handleDelete = async id => {
    try {
      const res = await deleteLead(id);
      console.log(res);
      const { status, message, data } = res;
      if (status) handleGetLeadList(0);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  useEffect(() => {
    handleGetLeadList(0, filters);
  }, [filters]);
  const handleClearFilter = () => {
    setFilters(initialFilterState);
  };

  const handleEdit = async id => {
    try {
      const res = await getLead(id);
      const { status, message, data } = res;
      if (status) {
        window.scrollTo(0, 0);
        dispatch(setItem(data));
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(leadList);
  return (
    <div className="app-container">
      <ItemForm onHandleSubmit={onHandleSubmit} />
      <ItemFilter dataList={leadList} handleFilter={handleFilter} filters={filters} handleClearFilter={handleClearFilter} />
      <ItemList dataList={leadList} handleDelete={handleDelete} handleEdit={handleEdit} />
      {!leadList?.find(item => item.id === 1) && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-lg btn-secondary" onClick={loadNext}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
