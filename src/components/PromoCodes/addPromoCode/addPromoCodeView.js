import React from "react";
import { FormattedMessage } from "react-intl";
import constants from "../../../utils/constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import moment from "moment";

export default function addPromoCodeView({
  ambassadorDetails,
  handleChange,
  handleAdd,

  error,
  handlePhoneChange,
  phoneValidation,
  emailValidation,
}) {
  const { phone: phoneError, email: emailError } = error;
  const profitPercentageOptions = constants[
    "PROFIT_PERCENTAGE_VALUES"
  ].map((val) => <option value={val}>{val}</option>);

  return (
    <div class="container-fluid">
      <div class="promo-code-add parent-div mt-4">
        <div class="head-bar flex-content">
          <div class="breadcrumb">
            <p>
              Promo Codes <b>Add Promo Code</b>
            </p>
          </div>
        </div>

        <div class="card-style  m-3">
          <div class="card-head flex-content">
            <div class="flex-content">
              <button type="button" class="btn btn-default back">
                <i class="fas fa-chevron-left"></i>
              </button>
              <h6>Add Promo Code</h6>
            </div>
            <div class="right-action-buttons flex-content ml-auto">
              <button type="button" class="btn btn-default theme-button mr-2">
                Add
              </button>
              <button type="button" class="btn btn-default grey-button mr-2">
                Cancel
              </button>
            </div>
          </div>
          <div class="cards-scroll p-3">
            <form class="card-details-form">
              <div class="form-group">
                <label>Promo Code</label>
                <div class="flex-content">
                  <button
                    type="button"
                    class="btn btn-default grey-button mr-2"
                  >
                    <i class="fas fa-cogs"></i> Auto Generate
                  </button>
                  <p style={{ color: "#24840E" }}>
                    <i class="fas fa-check"></i> Generated
                  </p>
                </div>
              </div>

              <div class="form-group mr-2">
                <label>Promo Title</label>
                <input
                  type="text"
                  class="form-control"
                  value={ambassadorDetails.name}
                  onChange={handleChange}
                />
              </div>

              <div class="flex-content">
                <div class="form-group select mr-2 position-relative">
                  <label>Promo Usage Limit</label>
                  <i class="fas fa-angle-down"></i>
                  <select class="form-control" id="" onChange={handleChange}>
                    <option disabled selected value="">
                      Select Category
                    </option>
                    <option value="id">10%</option>
                    <option value="id">20%</option>
                    <option value="id">30%</option>
                    <option value="id">40%</option>
                  </select>
                </div>

                <div class="form-group select position-relative">
                  <label>Per User Limit</label>
                  <i class="fas fa-angle-down"></i>
                  <select class="form-control" id="">
                    <option disabled selected value="">
                      Select Category
                    </option>
                    <option value="id">10%</option>
                    <option value="id">20%</option>
                    <option value="id">30%</option>
                    <option value="id">40%</option>
                  </select>
                </div>
              </div>

              <div class="flex-content">
                <div class="form-group select mr-2 position-relative">
                  <label>Promo Type</label>
                  <i class="fas fa-angle-down"></i>
                  <select class="form-control" id="">
                    <option disabled selected value="">
                      Select Category
                    </option>
                    <option value="id">Normal</option>
                    <option value="id">Ambassador Code</option>
                  </select>
                </div>

                <div class="form-group mr-2">
                  <label>Maximum Value of Promo Code</label>
                  <input type="text" class="form-control" />
                </div>
              </div>

              <div class="flex-content">
                <div class="form-group mr-2 position-relative icon-set-input">
                  <i class="far fa-calendar-alt"></i>
                  <label>Start Date</label>
                  <input
                    type="text"
                    class="form-control pl-4"
                    placeholder="11 Jan 2020, 01:42 PM"
                  />
                </div>

                <div class="form-group  position-relative icon-set-input">
                  <i class="far fa-calendar-alt"></i>
                  <label>Expire On</label>
                  <input
                    type="text"
                    class="form-control pl-4"
                    placeholder="11 Jan 2020, 01:42 PM"
                  />
                  <div class="radio">
                    <input type="radio" class="" value="Forever" />
                    <label>Forever</label>
                  </div>
                </div>

                <div class="form-group">
                  <label>Description</label>
                  <textarea class="form-control"></textarea>
                  <p
                    class="text-right mt-2"
                    style={{ color: "#B1B1B1", fontSize: "10px" }}
                  >
                    300 Characters Maximum
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="showcountries">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Countries</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div
                style={{ flexWrap: "wrap" }}
                class="flex-content selected mb-2 pb-2"
              >
                <button
                  type="button"
                  class="btn btn-default theme-button mr-1 mt-1"
                >
                  All Countries
                </button>
              </div>
              <div style={{ flexWrap: "wrap" }} class="flex-content">
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  All Countries
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  India
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  Australia
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  USA
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  Canada
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  UAE
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  India
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  Australia
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  USA
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  Canada
                </button>
                <button
                  type="button"
                  class="btn btn-default white-button mr-1 mt-1"
                >
                  UAE
                </button>
              </div>
            </div>

            <div style={{ justifyContent: "center" }} class="modal-footer">
              <button
                type="button"
                class="btn btn-default theme-button"
                data-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
