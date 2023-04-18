
import { useEffect, useState } from "react";
import "../App.css";
import {InventoryTableRow, InventoryTableJsonObject, getInventoryTable} from "../DataObjects/InventoryTableInterface";
import { INIT_INVENTORY_RESULT_DATA } from "../DataConstants/InventoryTableConstants";

export default function Main() {

  const [tableData, setTableData] = useState<InventoryTableRow[]>([INIT_INVENTORY_RESULT_DATA]);
  const [modalInventoryData, setmodalInventoryData] = useState<InventoryTableRow>(INIT_INVENTORY_RESULT_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);


  //A function that supports the creation of the inventory table.
  function setInventoryTable(){
    try{
      getInventoryTable().then(
        function (response: any){
          let inventoryTableArray: InventoryTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: InventoryTableJsonObject) => {
            inventoryTableArray.push({
              id: (element.id ? element.id : null),
              InventoryName: (element.inventory_name ? element.inventory_name : ""),
              InventoryAddress: (element.inventory_address ? element.inventory_address : ""),
              InventoryCount: (element.inventory_current_num ? element.inventory_current_num : null),
              InventoryMaxCount: (element.inventory_max_num ? element.inventory_max_num : null)
            });
          });


          //Overwrite the table data.
          setTableData(inventoryTableArray);
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
    let inventoryRow: InventoryTableRow = tableData.at(key);
    setmodalInventoryData(inventoryRow);
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
            <p className="modal-card-title">Inventory Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalInventoryData.id ? modalInventoryData.id.toString() : "")}</p>
              { modalInventoryData.InventoryName &&
                <>
                  <label className="has-text-weight-medium">Inventory Name: </label>
                  <p>{(modalInventoryData.InventoryName ? modalInventoryData.InventoryName : "")}</p>
                </>
              }
            </div>
            <div className="column">
              { modalInventoryData.InventoryAddress &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalInventoryData.InventoryAddress ? modalInventoryData.InventoryAddress : "")}</p>
                </>
              }
              { modalInventoryData.InventoryCount &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalInventoryData.InventoryCount ? modalInventoryData.InventoryCount.toString() : "")}</p>
                </>
              }
              { modalInventoryData.InventoryMaxCount &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalInventoryData.InventoryMaxCount ? modalInventoryData.InventoryMaxCount.toString() : "")}</p>
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
    setInventoryTable();
  }, []);

  return (
    <>
      <h2 className="is-size-3 pb-5 has-text-weight-medium"> Inventory List</h2>
       <div className="box1 is-danger is-pulled-left">
                  <div className= "box1 is-8">

                      <img
                       src={require("./Contact.png")}
                       alt="Logo"
                       width="auto"
                       height="auto"
                      />
              </div>

                </div>
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
                  {tableData.map((row:any, i:number) =>
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
