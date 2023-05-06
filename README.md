WebCrawler :
Check if Kafka topics crawl_request_webcrawler and crawl_result_webcrawler exists, it will create the topic if the topic doesn’t exists.
It listen to the message in the topics, and crawling external website if it finds pattern “(http|https)://” anywhere in the message payload. The message payload is json of unknown schema.
Once the crawling completes, it stores the crawled HTML text to Elastic Search and publish the status in crawl_result_webcrawler topic.

Crawl API:
Receives crawl request through /crawl endpoint and response with crawlId.
Iterate though Kafka topics with following pattern crawl_request_* , and put the crawl request payload to the topics.
Receives crawl status check through /result endpoint and response with array of activated crawler method and their status.
WebCrawler :
Check if Kafka topics crawl_request_webcrawler and crawl_result_webcrawler exists, it will create the topic if the topic doesn’t exists.
It listen to the message in the topics, and crawling external website if it finds pattern “(http|https)://” anywhere in the message payload. The message payload is json of unknown schema.
Once the crawling completes, it stores the crawled HTML text to Elastic Search and publish the status in crawl_result_webcrawler topic.

Crawl API:
Receives crawl request through /crawl endpoint and response with crawlId.
Iterate though Kafka topics with following pattern crawl_request_* , and put the crawl request payload to the topics.
Receives crawl status check through /result endpoint and response with array of activated crawler method and their status.


##starting up kafka.Rmb to open 2 cmd terminals
 1)cd kafka 
2).\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
3).\bin\windows\kafka-server-start.bat .\config\server.properties

##creating topics in kafka using cmd
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --topic "topic_name" --create --partitions 3 --replication-factor 1

##listing of topics
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --list


##Steps to start the API service and webcrawler service on your local PC
Make sure npm install has been done in the webcrawler and Crawl API folders!
Make sure .env file is in root directory.
1)After starting the kafka brokers in the steps above, go to the webcrawler directory and type "node index.js" or u can use "nodemon index.js" to start webcrawler service.
2)On a separate terminal.Go to Crawl_API directory and then go to bin directory.Type "nodemon www" or you can type "node www".API service is hosted on http://localhost:8085.Please type this url in the browser to check that the API service is running.The url for the swagger OpenAPI documentation is http://localhost:8085/api-docs/.
