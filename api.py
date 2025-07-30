#api.py
from logging import exception
import requests
import time
import threading

def get_agents():
    agents_url = "https://valorant-api.com/v1/agents"

    agents_response = requests.get(agents_url)
    if agents_response.ok:
        agent_data = agents_response.json()
        agents = [
        (agent["uuid"], agent["displayName"])
        for agent in agent_data["data"]
        ]

        return agents

    return []

def get_auth_token():
    import urllib3
    from getToken import get_token

    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    token, port = get_token()

    entitlement_url = f"https://127.0.0.1:{port}/entitlements/v1/token"
    headers = {
        "Authorization": f"Basic {token}"
    }

    entitlement_response = requests.get(entitlement_url, headers=headers, verify=False)
    if entitlement_response.ok:
        entitlement_data = entitlement_response.json()
        access_token = entitlement_data["accessToken"]
        id_token = entitlement_data["token"]
        return [access_token, id_token]
    return []

def lock(agent_id):
    player_url = "https://auth.riotgames.com/userinfo"
    access_token, id_token = get_auth_token()
    print(access_token)
    print(id_token)

    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-Riot-Entitlements-JWT": id_token,
        "X-Riot-ClientVersion": "B312378013F36E38",
        "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"
    }

    player_info_response = requests.get(player_url, headers=headers, verify=False)

    if player_info_response.ok:
        player_info = player_info_response.json()
        puid = player_info["sub"]
        print(puid)

        while True:
            pre_game_player_url = f"https://glz-eu-1.eu.a.pvp.net/pregame/v1/players/{puid}"
            print(pre_game_player_url)
            pre_game_player_response = requests.get(pre_game_player_url, headers=headers, verify=False)

            if pre_game_player_response.ok:
                pre_game_player_data = pre_game_player_response.json()
                print(pre_game_player_data)
                match_id = pre_game_player_data["MatchID"]
                print(match_id)
                time.sleep(1)

                lock_agent_url = f"https://glz-eu-1.eu.a.pvp.net/pregame/v1/matches/{match_id}/lock/{agent_id}"
                lock_agent_response = requests.post(lock_agent_url, headers=headers, verify=False)

                if lock_agent_response.ok:
                    lock_agent_data = lock_agent_response.json()
                    print(lock_agent_data)
                    break

            print("Searching...")
            time.sleep(5)