import React from "react";
import "./ArtistBeautyProfile.css";
import { FormattedMessage } from "react-intl";
import constants from "../../utils/constants";
import BeautyProfileListItem from "./BeautyProfileListItem";
import NewLoader from "../common/LoadingSpinner/NewLoader";
import { Link } from "react-router-dom";
const {
  exp_in_years: expInYearsKeysValues,
  specialities: specialitiesKeysValues,
  race_specialization: raceSpecializationKeyValue,
  preferred_age_group: preferredAgeGroupKeyValue,
  brands_worked_with: brandsWorkedWithKeyValue,
  client_exp_preference: clientExpPreferenceKeyValue,
  gender_preference: genderPreferenceKeyValue,
  licenses: licensesKeyValue,
} = constants;

export default function ArtistBeautyProfileView({
  data,
  toggleSelect,
  handleSave,
  handleKey,
  loader,
  fieldsToUpdate,
  showModal,
  handleChange,
  runValidations,
  isBeingEdited,
  setIsBeingEditedFalse,
  setIsBeingEditedTrue,
  handleBrandsShow,
  artistId,
}) {
  const {
    exp_in_years: expInYears,
    specialities,
    race_specialization: raceSpecialization,
    preferred_age_group: preferredAgeGroup,
    brands_worked_with: brandsWorkedWith,
    client_exp_preference: clientExpPreference,
    gender_preference: genderPreference,
    licences: licenses,
    training_name: trainingName,
    training_date: trainingDate,
    training_location: trainingLocation,
  } = data;
  React.useEffect(() => {
    console.log("brandsReq,h", fieldsToUpdate, key);
  }, [fieldsToUpdate]);
  const [key, setKey] = React.useState("");
  return (
    <div className="container-fluid">
      <div className="beauty-profile parent-div mt-4">
        <div className="head-bar flex-content">
          <div className="breadcrumb">
            <p>
              Artist Management{">"} User Profile {">"}
              <b>
                <FormattedMessage
                  id="beautyProfile"
                  defaultMessage="Beauty Profile"
                />
              </b>
            </p>
          </div>
        </div>

        {/* <!-- PACKAGES-CARDS --> */}
        <div className="card-style beauty-profile-cards m-3">
          <div className="card-head flex-content">
            <Link to={`/artist-management/${artistId}/profile`}>
              <button type="button" className="btn btn-default back">
                <i className="fas fa-chevron-left"></i>
              </button>
            </Link>
            <h6>
              <FormattedMessage
                id="beautyProfile"
                defaultMessage="Beauty Profile"
              />
            </h6>
          </div>
          <div className="cards-scroll">
            {/* <!-- cards --> */}
            <div style={{ borderBottom: "1px solid #F5EEE7;" }} className="row">
              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>01</h5>
                      <h6 className="">
                        <FormattedMessage
                          id="ques.artist.experienceInYears"
                          defaultMessage={constants["QUES_EXPERIENCE_IN_YEARS"]}
                        />
                      </h6>
                    </div>

                    <div className="services">
                      <ul>
                        {Object.entries(expInYearsKeysValues).map(
                          ([keyName, valueName], index) => (
                            <BeautyProfileListItem
                              propertyName="exp_in_years"
                              stateVariable={expInYears}
                              keyName={keyName}
                              valueName={valueName}
                              toggleSelect={toggleSelect}
                              key={index}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      name="exp_in_years"
                      disabled={key == "1" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([constants["EXPERIENCE_IN_YEARS"]]);
                        setKey("1");

                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {/* <NewLoader/> */}
                      {loader === true && key == "1" ? <NewLoader /> : null}
                    </button>
                    
                  </div>
                </div>
              </div>

              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>02</h5>
                      <h6 className="mt-1">
                        <FormattedMessage
                          id="ques.artist.training"
                          defaultMessage={constants["QUES_TRAINING"]}
                        />
                      </h6>
                    </div>

                    <div className="options">
                      <form>
                        <div className="form-group position-relative">
                          <label>
                            <FormattedMessage
                              id="ques.artist.training.name"
                              defaultMessage="Name of the Training, classNamees or Workshops"
                            />
                          </label>
                          <input
                            type="text"
                            name="training_name"
                            className="form-control"
                            value={trainingName}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>

                        <div className="form-group position-relative">
                          <label>
                            <FormattedMessage
                              id="ques.artist.training.date"
                              defaultMessage="Date"
                            />
                          </label>
                          <input
                            type="date"
                            name="training_date"
                            className="form-control"
                            value={trainingDate}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group position-relative">
                          <label>
                            <FormattedMessage
                              id="ques.artist.training.location"
                              defaultMessage="Location"
                            />
                          </label>
                          <input
                            type="text"
                            name="training_location"
                            className="form-control"
                            value={trainingLocation}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <h6 className="mt-3">
                            <FormattedMessage
                              id="ques.artist.licenses"
                              defaultMessage={constants["QUES_LICENSE"]}
                            />
                          </h6>
                          <ol>
                            {Object.entries(licensesKeyValue).map(
                              ([keyName, valueName], index) => (
                                <BeautyProfileListItem
                                  propertyName="licences"
                                  stateVariable={licenses}
                                  keyName={keyName}
                                  valueName={valueName}
                                  toggleSelect={toggleSelect}
                                  key={index}
                                />
                              )
                            )}
                          </ol>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "2" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([
                          constants["TRAINING_NAME"],
                          constants["TRAINING_LOCATION"],
                          constants["TRAINING_DATE"],
                          constants["LICENSES"],
                        ]);
                        setKey("2");
                        //const result = runValidations()
                        if (true) {
                          showModal("Are you sure you want to update?");
                        }
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "2" ? <NewLoader /> : null}
                    </button>
                  
                  </div>
                </div>
              </div>

              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>03</h5>
                      <h6 className="mt-1">
                        <FormattedMessage
                          id="ques.artist.work"
                          defaultMessage="Share your Work"
                        />
                      </h6>
                    </div>

                    <div className="options">
                      <form>
                        <div className="form-group position-relative">
                          <label>
                            <FormattedMessage
                              id="ques.artist.website"
                              defaultMessage="ques.artist.website"
                            />
                          </label>
                          <input
                            name={constants["WEBSITE_LINK"]}
                            type="text"
                            className="form-control"
                            value={data[constants["WEBSITE_LINK"]]}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group position-relative mt-3">
                          <label>
                            <FormattedMessage
                              id="ques.artist.social"
                              defaultMessage=" If you have any social media pages, (Facebook,
                            Instagram), please include handles below"
                            />
                          </label>

                          <div className="social-linked link-account flex-content">
                            <h6>
                              <i className="fab fa-facebook-f"></i>{" "}
                              <FormattedMessage
                                id="facebook"
                                defaultMessage="Facebook"
                              />
                            </h6>
                            {isBeingEdited[constants["FACEBOOK_LINK"]] ? (
                              <>
                                <input
                                  type="text"
                                  name={constants["FACEBOOK_LINK"]}
                                  className="form-control ml-auto"
                                  placeholder="Enter Link"
                                  value={data[constants["FACEBOOK_LINK"]]}
                                  onChange={handleChange}
                                />
                                {/* <i
                                  data-name={constants['FACEBOOK_LINK']}
                                  class="fa fa-check"
                                  aria-hidden="true"
                                  onClick={setIsBeingEditedFalse}
                                ></i> */}
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-default ml-auto"
                                name={constants["FACEBOOK_LINK"]}
                                onClick={setIsBeingEditedTrue}
                              >
                                {data[constants["FACEBOOK_LINK"]]
                                  ? "Linked"
                                  : "Link Account"}
                              </button>
                            )}
                          </div>

                          <div className="social-linked link-account flex-content">
                            <h6>
                              <i className="fab fa-instagram"></i>{" "}
                              <FormattedMessage
                                id="instagram"
                                defaultMessage="Instagram"
                              />
                            </h6>
                            {isBeingEdited[constants["INSTAGRAM_LINK"]] ? (
                              <>
                                <input
                                  type="text"
                                  name={constants["INSTAGRAM_LINK"]}
                                  className="form-control ml-auto"
                                  placeholder="Enter Link"
                                  value={data[constants["INSTAGRAM_LINK"]]}
                                  onChange={handleChange}
                                />
                                {/* <i
                                  data-name={constants['INSTAGRAM_LINK']}
                                  class="fa fa-check"
                                  aria-hidden="true"
                                  onClick={setIsBeingEditedFalse}
                                ></i> */}
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-default ml-auto"
                                name={constants["INSTAGRAM_LINK"]}
                                onClick={setIsBeingEditedTrue}
                              >
                                {data[constants["INSTAGRAM_LINK"]]
                                  ? "Linked"
                                  : "Link Account"}
                              </button>
                            )}
                          </div>

                          <div className="social-linked link-account flex-content">
                            <h6>
                              <i className="fab fa-youtube"></i>{" "}
                              <FormattedMessage
                                id="youtube"
                                defaultMessage="Youtube"
                              />
                            </h6>
                            {isBeingEdited[constants["YOUTUBE_LINK"]] ? (
                              <>
                                <input
                                  type="text"
                                  name={constants["YOUTUBE_LINK"]}
                                  className="form-control ml-auto"
                                  placeholder="Enter Link"
                                  value={data[constants["YOUTUBE_LINK"]]}
                                  onChange={handleChange}
                                />
                                {/* <i
                                  data-name={constants['YOUTUBE_LINK']}
                                  class="fa fa-check"
                                  aria-hidden="true"
                                  onClick={setIsBeingEditedFalse}
                                ></i> */}
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-default ml-auto"
                                name={constants["YOUTUBE_LINK"]}
                                onClick={setIsBeingEditedTrue}
                              >
                                {data[constants["YOUTUBE_LINK"]]
                                  ? "Linked"
                                  : "Link Account"}
                              </button>
                            )}
                          </div>

                          <div className="social-linked link-account flex-content">
                            <h6>
                              <i className="fab fa-pinterest-p"></i>{" "}
                              <FormattedMessage
                                id="pinterest"
                                defaultMessage="Pinterest"
                              />
                            </h6>
                            {isBeingEdited[constants["PINTEREST_LINK"]] ? (
                              <>
                                <input
                                  type="text"
                                  name={constants["PINTEREST_LINK"]}
                                  className="form-control ml-auto"
                                  placeholder="Enter Link"
                                  value={data[constants["PINTEREST_LINK"]]}
                                  onChange={handleChange}
                                />
                                {/* <i
                                  data-name={constants['PINTEREST_LINK']}
                                  class="fa fa-check"
                                  aria-hidden="true"
                                  onClick={setIsBeingEditedFalse}
                                ></i> */}
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-default ml-auto"
                                name={constants["PINTEREST_LINK"]}
                                onClick={setIsBeingEditedTrue}
                              >
                                {data[constants["PINTEREST_LINK"]]
                                  ? "Linked"
                                  : "Link Account"}
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "3" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([
                          constants["WEBSITE_LINK"],
                          constants["INSTAGRAM_LINK"],
                          constants["FACEBOOK_LINK"],
                          constants["YOUTUBE_LINK"],
                          constants["PINTEREST_LINK"],
                        ]);
                        setKey("3");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "3" ? <NewLoader /> : null}
                    </button>
                  
                  </div>
                </div>
              </div>
              {/* ----Specialities---- */}
              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>04</h5>
                      <h6 className="mt-1">
                        <FormattedMessage
                          id="ques.artist.specialities"
                          defaultMessage={constants["QUES_SPECIALITIES"]}
                        />
                      </h6>
                    </div>

                    <div className="services">
                      <ul>
                        {Object.entries(specialitiesKeysValues).map(
                          ([keyName, valueName], index) => (
                            <BeautyProfileListItem
                              propertyName="specialities"
                              stateVariable={specialities}
                              keyName={keyName}
                              valueName={valueName}
                              toggleSelect={toggleSelect}
                              key={index}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      name="specialities"
                      disabled={key == "4" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([constants["SPECIALITIES"]]);
                        setKey("4");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "4" ? <NewLoader /> : null}
                    </button>
                  
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              {/* ----Ideal Client Age---- */}
              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>05</h5>
                      <h6 className="">
                        <FormattedMessage
                          id="ques.artist.idealClientAge"
                          defaultMessage={constants["QUES_IDEAL_CLIENT_AGE"]}
                        />
                      </h6>
                    </div>

                    <div className="services">
                      <ul>
                        {Object.entries(preferredAgeGroupKeyValue).map(
                          ([keyName, valueName], index) => (
                            <BeautyProfileListItem
                              propertyName="preferred_age_group"
                              stateVariable={preferredAgeGroup}
                              keyName={keyName}
                              valueName={valueName}
                              toggleSelect={toggleSelect}
                              key={index}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "5" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([constants["PREFERRED_AGE_GROUP"]]);
                        setKey("5");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "5" ? <NewLoader /> : null}
                    </button>
                    
                  </div>
                </div>
              </div>

              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color hight-change">
                    <div className="head-part">
                      <h5>06</h5>
                      <h6 className="">
                        <FormattedMessage
                          id="ques.artist.brandPreference"
                          defaultMessage={constants["QUES_BRAND_PREF"]}
                        />
                      </h6>
                    </div>

                    <div className="services">
                      <ul>
                        {Object.entries(brandsWorkedWithKeyValue).map(
                          ([keyName, valueName], index) => (
                            <BeautyProfileListItem
                              propertyName="brands_worked_with"
                              stateVariable={brandsWorkedWith}
                              keyName={keyName}
                              valueName={valueName}
                              toggleSelect={toggleSelect}
                              key={index}
                            />
                          )
                        )}
                      </ul>
                    </div>

                    <div class="brand-own">
                      <form>
                        <div class="form-group">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <label>
                                <FormattedMessage
                                  id="brands.own"
                                  defaultMessage="Brands they own"
                                />
                              </label>
                            </div>
                            <div
                              onClick={handleBrandsShow}
                              className="cursor-pointer"
                            >
                              <i
                                onClick={handleBrandsShow}
                                class="fas fa-pencil-alt"
                                style={{ color: "#975e4a" }}
                              ></i>
                            </div>
                          </div>
                          <div class="tags-div flex-content-scroll">
                            {data.brand_list.length
                              ? data.brand_list.map((ele) => (
                                  <li>
                                    <div
                                      class="brand-tags flex-content"
                                      style={{
                                        width: "max-content",
                                      }}
                                    >
                                      <p class="mr-2">{ele.brand_name}</p>
                                    </div>
                                  </li>
                                ))
                              : ""}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "6" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([constants["BRANDS_WORKED_WITH"]]);
                        setKey("6");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "6" ? <NewLoader /> : null}
                    </button>
                 
                  </div>
                </div>
              </div>

              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>07</h5>
                      <h6 className="">
                        <FormattedMessage
                          id="ques.artist.clientExpPreference"
                          defaultMessage={constants["QUES_CLIENT_EXP_PREF"]}
                        />
                      </h6>
                    </div>

                    <div className="services">
                      <ul>
                        <li
                          style={{ flexWrap: "nowrap" }}
                          className={`d-flex cursor-pointer ${
                            !clientExpPreference.includes(
                              constants["CLIENT_EXP_BEGINNER"]
                            )
                              ? "unselected"
                              : ""
                          }`}
                          data-propertyName="client_exp_preference"
                          data-propertyVal="5001"
                          onClick={toggleSelect}
                        >
                          <i
                            class="fas fa-check-circle mr-2 mt-1"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5001"
                          ></i>
                          <div
                            class="right-side"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5001"
                          >
                            <b
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5001"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionOne"
                                defaultMessage="Beginner"
                              />
                            </b>
                            <p
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5001"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionOne.desc"
                                defaultMessage="Not Comfortable with Makeup"
                              />
                            </p>
                          </div>
                        </li>

                        <li
                          style={{ flexWrap: "nowrap" }}
                          className={`d-flex cursor-pointer ${
                            !clientExpPreference.includes(
                              constants["CLIENT_EXP_INTERMEDIATE"]
                            )
                              ? "unselected"
                              : ""
                          }`}
                          data-propertyName="client_exp_preference"
                          data-propertyVal="5002"
                          onClick={toggleSelect}
                        >
                          <i
                            class="fas fa-check-circle mr-2 mt-1"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5002"
                          ></i>
                          <div
                            class="right-side"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5002"
                          >
                            <b
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5002"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionTwo"
                                defaultMessage="Intermediate"
                              />
                            </b>
                            <p
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5002"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionTwo.desc"
                                defaultMessage="Somewhat Comfortable with Makeup"
                              />
                            </p>
                          </div>
                        </li>

                        <li
                          style={{ flexWrap: "nowrap" }}
                          className={`d-flex cursor-pointer ${
                            !clientExpPreference.includes(
                              constants["CLIENT_EXP_ADVANCED"]
                            )
                              ? "unselected"
                              : ""
                          }`}
                          data-propertyName="client_exp_preference"
                          data-propertyVal="5003"
                          onClick={toggleSelect}
                        >
                          <i
                            class="fas fa-check-circle mr-2 mt-1"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5003"
                          ></i>
                          <div
                            class="right-side"
                            data-propertyName="client_exp_preference"
                            data-propertyVal="5003"
                          >
                            <b
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5003"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionThree"
                                defaultMessage="Advanced"
                              />
                            </b>
                            <p
                              data-propertyName="client_exp_preference"
                              data-propertyVal="5003"
                            >
                              <FormattedMessage
                                id="clientExpPref.optionThree.desc"
                                defaultMessage="Very Comfortable with Makeup"
                              />
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "7" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([constants["CLIENT_EXPERIENCE_PREFERENCE"]]);
                        setKey("7");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "7" ? <NewLoader /> : null}
                    </button>
                  
                  </div>
                </div>
              </div>

              <div className="col-md-3 card-border pb-3">
                <div className="beauty-profile-card mt-3">
                  <div className="card-color">
                    <div className="head-part">
                      <h5>08</h5>
                      <h6 className="mt-1">
                        <FormattedMessage
                          id="ques.artist.genderPreference"
                          defaultMessage={constants["QUES_GENDER_PREF"]}
                        />
                      </h6>
                    </div>

                    <div className="options">
                      <ol>
                        {Object.entries(genderPreferenceKeyValue).map(
                          ([keyName, valueName], index) => (
                            <BeautyProfileListItem
                              propertyName="gender_preference"
                              stateVariable={genderPreference}
                              keyName={keyName}
                              valueName={valueName}
                              toggleSelect={toggleSelect}
                              key={index}
                            />
                          )
                        )}
                      </ol>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          value="other"
                        />
                      </div>
                      <div className="form-group">
                        <h6 className="mt-3">
                          <FormattedMessage
                            id="ques.artist.raceSpecialization"
                            defaultMessage={
                              constants["QUES_RACE_SPECIALIZATION"]
                            }
                          />
                        </h6>
                        <ol>
                          {Object.entries(raceSpecializationKeyValue).map(
                            ([keyName, valueName], index) => (
                              <BeautyProfileListItem
                                propertyName="race_specialization"
                                stateVariable={raceSpecialization}
                                keyName={keyName}
                                valueName={valueName}
                                toggleSelect={toggleSelect}
                                key={index}
                              />
                            )
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="save-button">
                    <button
                      type="button"
                      className="btn btn-default theme-button"
                      disabled={key == "8" && loader == true ? true : false}
                      onClick={(e) => {
                        handleSave([
                          constants["GENDER_PREFERENCE"],
                          constants["RACE_SPECIALIZATION"],
                        ]);
                        setKey("8");
                        showModal("Are you sure you want to update?");
                      }}
                    >
                      <FormattedMessage id="save" defaultMessage="Save" />
                      {loader === true && key == "8" ? <NewLoader /> : null}
                    </button>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
