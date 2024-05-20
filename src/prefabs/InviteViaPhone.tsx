import * as React from "react";
import { Toast } from "../components";

/**
 * InviteViaPhoneProps
 * @interface InviteViaPhoneProps
 * @property {string} link - The link to the room
 * @property {string} room_name - The name of the room
 */
export interface InviteViaPhoneEmailProps {
    link: string;
    room_name: string;
    participant: string | undefined;
    isCallScreen: boolean;
};

export function InviteViaPhone({ link, room_name, participant, isCallScreen, ...props }: InviteViaPhoneEmailProps) {
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const [defaultValue, setDefaultValue] = React.useState<string>('+1');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showToast, setShowToast] = React.useState<boolean>(false);
    const [countries, setCountries] = React.useState([]);

    React.useEffect(() => {
        fetch(`/country-list.json`).then(async (res) => {
            setCountries(await res.json());
        });
    }, [])

    function setEmpty() {
        if (inputRef.current && selectRef.current) {
            inputRef.current.value = '';
            selectRef.current.value = '';
            setDefaultValue('+1');
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (inputRef.current && inputRef.current.value.trim() !== '') {
            const number = selectRef.current?.value + inputRef.current.value;

            setEmpty();
            if (isCallScreen) {
                const queryParams = new URLSearchParams(window.location.search);
                const token = queryParams.get("token");
                const authKey = queryParams.get("authKey");

                const data = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "number": number, // body data type must match "Content-Type" header
                        "token": token,
                        "authkey": authKey,
                        "meeting_id": room_name,
                    })
                };
                fetch(`/api/invite-call-email-phone`, data).then(async (res) => {
                    if (res.ok) {
                        setShowToast(true);
                    } else {
                        throw Error('Error fetching server url, check server logs');
                    }
                });
            } else {
                const data = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "number": number, // body data type must match "Content-Type" header
                        "link": link,
                        "meeting_id": room_name,
                        "participant": participant,
                    })
                };
                fetch(`/api/invite-phone`, data).then(async (res) => {
                    if (res.ok) {
                        setShowToast(true);
                    } else {
                        throw Error('Error fetching server url, check server logs');
                    }
                });
            }
        }
    }

    React.useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
        }
    }, [showToast]);

    function changeValue() {
        if (selectRef.current) {
            setDefaultValue(selectRef.current.value);
        }
    }

    return (
        <div {...props}>
            {showToast ? <Toast className="lk-toast-connection-state">Invitation Sent</Toast> : <></>}
            <form className="lk-chat-form" onSubmit={handleSubmit}>
                <select className="lk-form-control lk-chat-form-input tl-select" ref={selectRef} value={defaultValue} onChange={changeValue}>
                    {countries.map((country: { name: string, dial_code: string; }) => (
                        <option value={country.dial_code}>{country.dial_code} - {country.name}</option>
                    ))}
                </select>

                <input className="lk-form-control lk-chat-form-input" type="tel" ref={inputRef} placeholder="Enter Mobile Number" pattern="[0-9]+" title="Enter valid mobile number" maxLength={10} minLength={10} />

                <button type="submit" className="lk-button lk-chat-form-button tl-invite-button">
                    Invite
                </button>
            </form>
        </div>
    );
}