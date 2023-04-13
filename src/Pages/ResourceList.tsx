
import { useEffect, useState } from "react";
import "../App.css";
import {ResourceTableRow, ResourceTableJsonObject, getResourceTable} from "../DataObjects/ResourceTableInterface";
import { INIT_RESULT_RESOURCE_DATA } from "../DataConstants/ResourceTableConstants";

export default function Main() {

  const [tableData, setTableData] = useState<ResourceTableRow[]>([INIT_RESULT_RESOURCE_DATA]);
  const [modalResourceData, setmodalResourceData] = useState<ResourceTableRow>(INIT_RESULT_RESOURCE_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);


  //A function that supports the creation of the resource table.
  function setResourceTable(){
    try{
      getResourceTable().then(
        function (response: any){
          let resourceTableArray: ResourceTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: ResourceTableJsonObject) => {
            resourceTableArray.push({
              id: (element.id ? element.id : null),
              Resources: (element.resources_pic ? element.resources_pic : ""),
              ResourcesName: (element.resources_name ? element.resources_name : ""),
              ResourcesCurrentNum: (element.resources_current_num ? element.resources_current_num : null),
              ResourceRandom: (element.resource_random ? element.resource_random : null)
            });
          });


          //Overwrite the table data.
          setTableData(resourceTableArray);
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
    let resourceRow: ResourceTableRow = tableData.at(key);
    setmodalResourceData(resourceRow);
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
            <p className="modal-card-title">Resource Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalResourceData.id ? modalResourceData.id.toString() : "")}</p>
              { modalResourceData.Resources &&
                <>
                  <label className="has-text-weight-medium">Resource Name: </label>
                  <p>{(modalResourceData.Resources ? modalResourceData.Resources: "")}</p>
                </>
              }
            </div>
            <div className="column">
              { modalResourceData.ResourcesName &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalResourceData.ResourcesName ? modalResourceData.ResourcesName : "")}</p>
                </>
              }
              { modalResourceData.ResourcesCurrentNum &&
                <>
                  <label className="has-text-weight-medium">Number of Resources: </label>
                  <p className="mb-3">{(modalResourceData.ResourcesCurrentNum ? modalResourceData.ResourcesCurrentNum.toString() : "")}</p>
                </>
              }
              { modalResourceData.ResourceRandom &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalResourceData.ResourceRandom ? modalResourceData.ResourceRandom.toString() : "")}</p>
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
    setResourceTable();
  }, []);

  return (
    <>
      <h2 className="is-size-2 pb-6 has-text-weight-medium"> Resource List</h2>
      <div className="container is-fluid mt-5">
              <progress className="progress is-link"
                        value="60" max="100">60%</progress>

          </div>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Resource Name</th>
                    <th>Resource Address</th>
                    <th>Current Number of Resource</th>
                    <th>Max Number of Inventories</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row:any, i:number) =>
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