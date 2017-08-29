var request = require('request');
var dns = require('dns')

module.exports = function(){
    this.master_url = ''

    return {
        set_master_url : () => {
            return new Promise((resolve, reject) => {
                dns.lookup("mr-redis.marathon.mesos", (error, address, family) => {
                    if (error != undefined) {
                        reject(error)
                        return
                    }

                    request(`http://${_address}:5656/v1/STATUS`, (error, response, body) => {
                        if (error != undefined) {
                            reject(error)
                            return
                        }

                        let config_json = JSON.parse(body)

                        if (config_json.length == 0) {
                            if (config_json[0].Status == "RUNNING") {
                                return
                            }

                            reject("REDIS Cluster Error!")
                        }

                        let master_config = config_json[0].Master
                        this.master_url = `http://${master_config.IP}:${master_config.Port}`
                        resolve(this.master_url)
                    })
                })
            })
        },
        get_master_url : () => this.master_url
    }
}()