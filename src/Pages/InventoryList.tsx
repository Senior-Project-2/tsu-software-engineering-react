import "../App.css";

import { useEffect, useState } from "react";
//import "../App.css";
import {ClientTableInventoryRow, ClientTableJsonObject, getClientTable} from "../DataObjects/ClientTableInventoryInterface";
import { INIT_RESULT_DATA } from "../DataConstants/ClientTableInventoryConstants";
import dummyData from "../DataConstants/clientDb.json";
const data: any = dummyData;
//export default
function InventoryList() {


  const [tableData, setTableData] = useState<ClientTableInventoryRow[]>([INIT_RESULT_DATA]);
  const [modalClientData, setmodalClientData] = useState<ClientTableInventoryRow>(INIT_RESULT_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);


  //A function that supports the creation of the client table.
  function setClientTable(){
    try{
      getClientTable().then(
        function (response: any){
          let clientTableArray: ClientTableInventoryRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: ClientTableJsonObject) => {
            clientTableArray.push({
              id: (element.id ? element.id : null),
              InventoryName: (element.inventory_name ? element.inventory_name : ""),
              InventoryAddress: (element.inventory_address ? element.inventory_address : ""),
              InventoryCount: (element.inventory_current_num ? element.inventory_current_num : null),
              InventoryMaxCount: (element.inventory_max_num ? element.inventory_max_num : null)
            });
          });


          //Overwrite the table data.
          setTableData(clientTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch{}
  }

  function toggleModal() {
    setIsModalActive(!isModalActive);
  }

  function showModal(key: number){
    let clientRow: ClientTableInventoryRow = tableData.at(key);
    setmodalClientData(clientRow);
    toggleModal();
  }


  const Modal = ({ closeModal, modalState }: { closeModal: any, modalState: boolean }) => {
    if(!modalState) {
      return null;
    }

    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head is-radiusless">
            <p className="modal-card-title">Client Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalClientData.id ? modalClientData.id.toString() : "")}</p>
              { modalClientData.InventoryName &&
                <>
                  <label className="has-text-weight-medium">Client Name: </label>
                  <p>{(modalClientData.InventoryName ? modalClientData.InventoryName : "")}</p>
                </>
              }
            </div>
            <div className="column">
              { modalClientData.InventoryAddress &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalClientData.InventoryAddress ? modalClientData.InventoryAddress : "")}</p>
                </>
              }
              { modalClientData.InventoryCount &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalClientData.InventoryCount ? modalClientData.InventoryCount.toString() : "")}</p>
                </>
              }
              { modalClientData.InventoryMaxCount &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalClientData.InventoryMaxCount ? modalClientData.InventoryMaxCount.toString() : "")}</p>
                </>
              }
            </div>
          </section>
        </div>
      </div>
    );
  }


  //The useEffect is a function that runs whenever the set data changes or when loading the page.
  useEffect(() => {
    setClientTable();
  }, []);

  return (
    <>
      <h2 className="is-size-2 pb-6 has-text-weight-medium"> Client Homepage</h2>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Inventory Name</th>
                    <th>Inventory Address</th>
                    <th>Current Number of Inventories</th>
                    <th>Max Number of Inventories</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.inventorylist.map((row:any, i:number) =>
                    <tr id={(row.id ? row.id.toString() : "")}>
                      <td>{(row.id ? row.id.toString() : "")}</td>
                      <td>{(row.inventory_name ? row.inventory_name : "")}</td>
                      <td>{(row.inventory_address ? row.inventory_address : "")}</td>
                      <td>{(row.inventory_current_num ? row.inventory_current_num.toString() : "")}</td>
                      <td>{(row.inventory_max_num ? row.inventory_max_num.toString() : "")}</td>
                      <td><button className="button is-dark" onClick={() => showModal(i)}>View Client Details</button></td>
                      <td><button className="button is-dark" onClick={() => showModal(i)}>Edit Client Details</button></td>
                    </tr>
                  )}
                </tbody>
            </table>
            <Modal
              closeModal={toggleModal}
              modalState={isModalActive.valueOf()}
            />
        </div>
      </div>
    </>
  );
}
export default InventoryList;
