import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
} from "@mui/material";
// import View from "../";
interface FilterModalProps {
  show: boolean;
  setShow: (type: boolean) => void;
  //   onApply: (filters: FilterOptions) => void;
}

interface FilterOptions {
  kycLevel: string;
  dateRegistered: string;
  lastSeen: string;
  showMerchant: boolean;
  status: string;
  merchantType: string | boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  setShow,
  //   onApply,
}) => {
  const [kycLevel, setKycLevel] = useState("");
  const [dateRegistered, setRegistered] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [showMerchant, setShowMerchant] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [unVerified, setUnVerified] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [chooseAll, setChooseAll] = useState(true);

  const onApply = (inf: any) => {};

  const handleApply = () => {
    const filters: FilterOptions = {
      kycLevel,
      dateRegistered,
      lastSeen,
      showMerchant: chooseAll ? true : showMerchant,
      status,
      merchantType: chooseAll ? "" : verified,
    };

    onApply(filters);
  };

  const handleChooseAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChooseAll(event.target.value === "chooseAll");
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)}>
      <DialogTitle>Filter Users</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Select your filters:</DialogContentText> */}
        <FormControl fullWidth>
          <Select
            value={kycLevel}
            onChange={(e) => setKycLevel(e.target.value as string)}
            displayEmpty
            className="mb-4"
          >
            <MenuItem value="">KYC Level</MenuItem>
            <MenuItem value="Unverified">Unverified</MenuItem>
            <MenuItem value="Level 0">Level 0</MenuItem>
            <MenuItem value="Level 1">Level 1</MenuItem>
            <MenuItem value="Level 2">Level 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select
            value={dateRegistered}
            onChange={(e) => setRegistered(e.target.value as string)}
            displayEmpty
            className="mb-4"
          >
            <MenuItem value="">Date Registered</MenuItem>
            <MenuItem value="7_DAYS">Last 7 days</MenuItem>
            <MenuItem value="10_DAYS">Last 10 days</MenuItem>
            <MenuItem value="100_DAYS">Last 100 days</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="pb-4">
          <Select
            value={lastSeen}
            onChange={(e) => setLastSeen(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="">Last Seen</MenuItem>
            <MenuItem value="1_HOUR">1 hour ago</MenuItem>
            <MenuItem value="12_HOUR">12 hours ago</MenuItem>
            <MenuItem value="1_DAY">1 day ago</MenuItem>
            <MenuItem value="5_DAY">5 days ago</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <RadioGroup
            value={chooseAll ? "chooseAll" : "merchant"}
            onChange={handleChooseAllChange}
          >
            <FormControlLabel
              value="chooseAll"
              control={<Radio />}
              label="Choose all"
            />
            <FormControlLabel
              value="merchant"
              control={<Radio />}
              label="Merchant"
            />
          </RadioGroup>
          {!chooseAll && (
            <div className="flex items-center space-x-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                  />
                }
                label="Verified"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={unVerified}
                    onChange={(e) => setUnVerified(e.target.checked)}
                  />
                }
                label="Unverfied"
              />
            </div>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="deactivated">Deactivated</MenuItem>
            <MenuItem value="flagged">Flagged</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
