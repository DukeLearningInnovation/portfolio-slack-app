FROM node:6.10.0-alpine

ENV NODE_ENV development

ENV PATH /usr/local/bin:$PATH


RUN apk add --no-cache \
    python3 \
    py-pip \
    ca-certificates \
    groff \
    less \
    bash \
  && pip install --no-cache-dir --upgrade pip awscli
RUN aws --version 
RUN npm install && npm install -g serverless
# RUN which yarn
# RUN yarn config set prefix /usr/local/bin/yarn
# RUN yarn config list

# RUN yarn global add serverless 
RUN which serverless

# ENV GITHUB_API_KEY=${GITHUB_API_KEY}
# ENV SLACK_ACCESS_TOKEN=${SLACK_ACCESS_TOKEN}
# ENV SLACK_VERIFICATION_TOKEN=${SLACK_VERIFICATION_TOKEN}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

WORKDIR /app
RUN mkdir ~/.aws
RUN echo $'[default] \n\
output = json \n\
region = us-east-1' > ~/.aws/config

# RUN echo $'[default] \n\
# aws_access_key_id = $AWS_ACCESS_KEY_ID \n\
# aws_secret_access_key = $AWS_SECRET_ACCESS_KEY' >~/.aws/credentials

 
# RUN aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID &&\
#     aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY &&\
#     aws configure set region us-east-1 &&\
RUN aws configure list

# RUN serverless config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}


EXPOSE 8888
ENTRYPOINT ["/bin/bash", "-c"]