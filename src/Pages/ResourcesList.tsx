import "../App.css";

import { useEffect, useState } from "react";
//import "../App.css";
import {ClientTableResourcesRow, ClientTableJsonObject, getClientTable} from "../DataObjects/ClientTableResourcesInterface";
import { INIT_RESULT_DATA } from "../DataConstants/ClientTableResourcesConstants";
import dummyData from "../DataConstants/clientDb.json";
const data: any = dummyData;
//export default
function ResourcesList() {


  const [tableData, setTableData] = useState<ClientTableResourcesRow[]>([INIT_RESULT_DATA]);
  const [modalClientData, setmodalClientData] = useState<ClientTableResourcesRow>(INIT_RESULT_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);


  //A function that supports the creation of the client table.
  function setClientTable(){
    try{
      getClientTable().then(
        function (response: any){
          let clientTableArray: ClientTableResourcesRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: ClientTableJsonObject) => {
            clientTableArray.push({
              id: (element.id ? element.id : null),
              Resources: (element.resources_pic ? element.resources_pic : ""),
              ResourcesName: (element.resources_name ? element.resources_name : ""),
              ResourcesCurrentNum: (element.resources_current_num ? element.resources_current_num : null),
              ResourceRandom: (element.resource_random ? element.resource_random : null)
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
    let clientRow: ClientTableResourcesRow = tableData.at(key);
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
              { modalClientData.Resources &&
                <>
                  <label className="has-text-weight-medium">Client Name: </label>
                  <p>{(modalClientData.Resources ? modalClientData.Resources: "")}</p>
                </>
              }
            </div>
            <div className="column">
              { modalClientData.ResourcesName &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalClientData.ResourcesName ? modalClientData.ResourcesName : "")}</p>
                </>
              }
              { modalClientData.ResourcesCurrentNum &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalClientData.ResourcesCurrentNum ? modalClientData.ResourcesCurrentNum.toString() : "")}</p>
                </>
              }
              { modalClientData.ResourceRandom &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalClientData.ResourceRandom ? modalClientData.ResourceRandom.toString() : "")}</p>
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
                      <td>{(row.resources_pic ? row.resources_pic : "")}</td>
                      <td>{(row.resources_name ? row.resources_name : "")}</td>
                      <td>{(row.resources_current_num ? row.resources_current_num.toString() : "")}</td>
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
export default ResourcesList;