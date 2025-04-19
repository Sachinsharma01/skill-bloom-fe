import React, { useState } from "react";
import { Input } from "../ui/input";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { makeAPICall } from "../../utils/api";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const ProfileSetting = ({ user }: { user: any }) => {
  const { token } = useSelector((state: any) => state.tokenReducer);
  const [name, setName] = useState(user?.name);
  const [linkedin, setLinkedin] = useState(user?.linkedin);
  const [profession, setProfession] = useState(user?.profession);
  const [state, setState] = useState(user?.state);
  const [country, setCountry] = useState(user?.country);
  const [username, setUsername] = useState(user?.username);
  const [mobileNumber, setMobileNumber] = useState(user?.mobile_number);

  const [isLoading, setIsLoading] = useState(false);

  const copyReferralCode = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(user?.referral_code).then(() => {
        toast.success("Referral code copied to clipboard");
      });
    } else {
      document.execCommand("copy", true, user?.referral_code);
      toast.success("Referral code copied to clipboard");
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    makeAPICall('updateProfile', {
      id: user?.id,
      name,
      linkedin,
      profession,
      state,
      country,
      username,
      mobile_number: mobileNumber,
    }, token).then((res: any) => {
      console.log(res);
      setIsLoading(false);
      toast.success("Profile updated successfully");
      
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium">Full Name</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Country</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">State</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Profession</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Mobile Number</label>
          <Input
            className="w-full border rounded px-3 py-2 mt-1"
            value={mobileNumber}
            maxLength={10}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">LinkedIn</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 rounded-l">
              linkedin.com/
            </span>
            <Input
              className="flex-1 border rounded-r px-3 py-2"
              placeholder={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">My Referral Code</label>
          <div className="flex">
            <Input
              className="flex-1 border rounded-r px-3 py-2"
              placeholder={user?.referral_code}
              readOnly
            />
            <span
              className="inline-flex items-center px-3 border border rounded cursor-pointer"
              onClick={copyReferralCode}
            >
              <CopyIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="bg-purple-500 text-white px-6 py-2 rounded" onClick={handleSave} disabled={isLoading} style={{ backgroundColor: isLoading ? '#ccc' : '#800080' }}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </>
  );
};

export default ProfileSetting;
