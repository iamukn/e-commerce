import boto3
from django.conf import settings
import os


BUCKET = os.environ.get('R2_BUCKET')

r2 = boto3.client(
    "s3",
    endpoint_url=os.environ.get('R2_ENDPOINT'),
    aws_access_key_id=os.environ.get('R2_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('R2_SECRET_KEY'),
    region_name="auto"
)


def delete_from_r2(bucket, old_key):
    try:
        r2.delete_object(
            Bucket=bucket,
            Key=old_key
        )
        return True
    except Exception as e:
        return False

def uploadToR2(image, BUCKET, new_key, is_update=False, old_key=''):
    
    
    def upload_file(image, bucket, key):
        try:
            r2.upload_fileobj(
                image,
                bucket,
                Key=key,
                ExtraArgs={
                    "ContentType": image.content_type
                }
            )
            return True
        except Exception as e:
            raise e

    # upload fresh image
    if not is_update:
        upload_file(
            image=image,
            bucket=BUCKET,
            key=new_key
        )
        return

    
    # handle image update
    # delete old image
    old_key = old_key.split('/', 3)[-1]

    # add new image
    upload_file(
        image=image,
        bucket=BUCKET,
        key=new_key
    )
    # delete old image
    delete_from_r2(
        bucket=BUCKET,
        old_key=old_key
    )



def updateAndDeleteImage(image: dict, new_key):
    
    old_key = image.get('old_key')

    try:
        # delete old image
        delete_from_r2(
            bucket=BUCKET,
            old_key=old_key
        )

        # add new images to R2

        uploadToR2(
            image=image.get('image'),
            BUCKET=BUCKET,
            new_key=new_key
        )
    except Exception as e:
        raise e